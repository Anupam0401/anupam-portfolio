import { BlogPost } from '@/types/portfolio'

export const blogPosts: BlogPost[] = [
  {
    id: 'api-performance-shadow-testing',
    title: 'API Performance Optimization: 90% Latency Reduction with Shadow Testing',
    excerpt: 'How we optimized high-traffic APIs from 3s to <300ms using shadow testing, achieving 90% latency improvement and 83% CPU reduction while maintaining zero production risk.',
    content: `# API Performance Optimization: 90% Latency Reduction with Shadow Testing

## The Problem

Our critical offer-details API was struggling under load with concerning performance metrics:

- **P95 Latency**: 4+ seconds  
- **P99 Latency**: 8+ seconds  
- **CPU Usage**: ~60% sustained  
- **Traffic**: 90%+ of all API requests  
- **User Impact**: Slow loan application experience

### Root Cause Analysis

The culprit? **Complex fee calculations being executed multiple times per request**:
- 1x calculation for base loan amount
- Nx calculations for each slider step (5-10 additional calls)
- Each calculation taking ~100ms
- **Total overhead**: 600-1000ms per API call

\`\`\`text
API Request Flow (Before):
User Request → Calculate Fee(baseAmount) [~100ms]
            → Calculate Fee(step1) [~100ms]
            → Calculate Fee(step2) [~100ms]
            → Calculate Fee(step3) [~100ms]
            → ... (5-10 more iterations)
            → Return Response [Total: 600-1000ms in calculations alone]
\`\`\`

## The Challenge

**How do you optimize production code serving thousands of requests per minute without risking user experience?**

Traditional approaches were too risky:
- ❌ Direct deployment could break production
- ❌ Canary releases still expose real users to bugs
- ❌ Staging environments don't replicate production patterns

## Solution: Shadow Testing Pattern

### What is Shadow Testing?

Shadow testing (dark launching) runs optimized code **in parallel** with production code. Both execute, but only the production result is returned to users.

\`\`\`mermaid
sequenceDiagram
    participant User
    participant API
    participant ProdCode as Production Code
    participant ShadowCode as Optimized Code
    participant Metrics

    User->>API: Request
    API->>ProdCode: Execute (blocking)
    ProdCode-->>API: Result
    API->>User: Return Production Result
    
    par Shadow Execution
        API->>ShadowCode: Execute (async)
        ShadowCode-->>Metrics: Log performance
        ShadowCode-->>Metrics: Compare results
    end
\`\`\`

### Key Benefits

1. **Zero Risk**: Production always uses tested code
2. **Real Data**: Test with actual user patterns
3. **Gradual Rollout**: Start at 1%, scale to 10%+
4. **Confidence**: Validate optimizations empirically before switching

## Architecture Design

### High-Level Architecture

\`\`\`mermaid
graph TB
    subgraph "API Layer"
        API[Offer Details API]
    end
    
    subgraph "Production Flow"
        ProdCalc[Production Calculator]
        ProdResult[Return to User]
    end
    
    subgraph "Shadow Flow"
        Config[Shadow Config]
        Sampling[Sampling Logic<br/>1-10% traffic]
        ThreadPool[Dedicated Thread Pool<br/>Isolated Executor]
        OptimizedCalc[Optimized Calculator]
        Compare[Result Comparator]
        Metrics[Metrics & Logging]
    end
    
    API-->ProdCalc
    ProdCalc-->ProdResult
    
    API-->Config
    Config-->Sampling
    Sampling-->ThreadPool
    ThreadPool-->OptimizedCalc
    OptimizedCalc-->Compare
    Compare-->Metrics
    
    style ProdResult fill:#90EE90
    style Metrics fill:#87CEEB
\`\`\`

### Core Components

**1. Shadow Flow Executor**

\`\`\`java
@Component
public class ShadowFlowExecutor {
    private final ExecutorService shadowExecutor;
    private final Timer shadowTimer;
    
    public void executeAndCompareAsync(
        Request request, 
        Result liveResult, 
        ShadowConfig config
    ) {
        // Check if should execute shadow
        if (!shouldRunShadow(config.getSamplingRate())) {
            return;
        }
        
        // Execute in separate thread pool
        CompletableFuture.runAsync(() -> {
            Timer.Sample sample = Timer.start();
            try {
                Result shadowResult = optimizedCalculation(request);
                compareAndLog(liveResult, shadowResult);
            } catch (Exception e) {
                log.error("Shadow calculation failed", e);
            } finally {
                sample.stop(shadowTimer);
            }
        }, shadowExecutor);
    }
}
\`\`\`

**2. Configuration Management**

\`\`\`yaml
shadow:
  enabled: true
  sampling-rate: 0.01  # 1% of traffic
  thread-pool-size: 10
  timeout-ms: 5000
  circuit-breaker:
    enabled: true
    error-threshold: 5
    reset-timeout: 60000
\`\`\`

**3. Circuit Breaker Pattern**

\`\`\`mermaid
stateDiagram-v2
    [*] --> Closed
    Closed --> Open: Error rate > threshold
    Open --> HalfOpen: After reset timeout
    HalfOpen --> Closed: Test succeeds
    HalfOpen --> Open: Test fails
    
    state Closed {
        [*] --> Processing
        Processing --> Success: Shadow runs
        Processing --> Error: Shadow fails
    }
    
    state Open {
        [*] --> SkipShadow
        SkipShadow --> [*]: Return immediately
    }
\`\`\`

## Optimization Strategies Applied

### 1. Request-Scoped Caching

**Problem**: Same calculation repeated 6+ times per request

\`\`\`java
// Before: Calculated multiple times
public BigDecimal calculateFee(LoanRequest req) {
    // Expensive iterative computation
    return complexCalculation(req);
}

// After: Request-scoped cache
@Component
@Scope(value = "request", proxyMode = ScopedProxyMode.TARGET_CLASS)
public class FeeCalculationCache {
    private final Map<String, BigDecimal> cache = new HashMap<>();
    
    public BigDecimal getOrCompute(
        String key, 
        Supplier<BigDecimal> supplier
    ) {
        return cache.computeIfAbsent(key, k -> supplier.get());
    }
}
\`\`\`

**Impact**: Eliminated 5-9 redundant calculations → **~80% time saved**

### 2. Parallel Processing

\`\`\`java
// Process slider steps in parallel
List<CompletableFuture<FeeDetails>> futures = sliderSteps
    .stream()
    .map(step -> CompletableFuture.supplyAsync(
        () -> calculateForStep(step), 
        parallelExecutor
    ))
    .collect(Collectors.toList());

List<FeeDetails> results = futures.stream()
    .map(CompletableFuture::join)
    .collect(Collectors.toList());
\`\`\`

### 3. Algorithm Optimization

- Replaced O(n²) iterative approach with O(n) closed-form solution
- Pre-computed frequently used constants
- Eliminated unnecessary precision in intermediate steps

\`\`\`java
// Before: Iterative convergence
while (Math.abs(current - target) > tolerance) {
    current = iterate(current); // O(n) iterations
}

// After: Direct computation
result = closedFormSolution(input); // O(1)
\`\`\`

## Deployment Strategy

### Phased Rollout

\`\`\`mermaid
gantt
    title Shadow Testing Rollout Timeline
    dateFormat YYYY-MM-DD
    section Phase 1
    Deploy Disabled           :done, p1, 2024-09-01, 5d
    Verify Zero Impact        :done, p1v, after p1, 2d
    section Phase 2
    Enable 1% Sampling        :active, p2, after p1v, 7d
    Monitor & Analyze         :active, p2m, after p2, 3d
    section Phase 3
    Increase to 5%            :p3, after p2m, 5d
    Performance Validation    :p3v, after p3, 3d
    section Phase 4
    Scale to 10%              :p4, after p3v, 5d
    Final Go/No-Go            :milestone, p4d, after p4, 1d
    section Production
    Switch to Optimized Code  :crit, prod, after p4d, 1d
\`\`\`

### Week-by-Week Execution

**Week 1**: Deploy with shadow disabled
- ✅ Code deployed, shadow flow inactive
- ✅ Zero production impact
- ✅ Monitoring infrastructure validated

**Week 2**: 1% sampling
- ✅ Shadow calculations on 1% traffic
- ✅ Logs analyzed for accuracy
- ✅ Performance metrics collected

**Weeks 3-4**: Gradual increase (5% → 10%)
- ✅ Statistical significance achieved
- ✅ Edge cases identified and fixed
- ✅ Performance validated at scale

**Week 5**: Production rollout
- ✅ Replaced old implementation
- ✅ Kept shadow flow as safety net
- ✅ Monitored closely for regressions

## Monitoring & Observability

### Custom Metrics

\`\`\`java
@Timed(value = "shadow.execution", 
       extraTags = {"flow", "optimized"})
public Result executeOptimized(Request req) {
    // ... calculation logic
}

// Difference tracking
meterRegistry.counter("shadow.differences",
    "type", differenceType,
    "severity", severity
).increment();
\`\`\`

### Alert Thresholds

| Metric | Warning | Critical | Action |
|--------|---------|----------|--------|
| P95 Latency | > 500ms | > 1s | Investigate |
| Shadow Error Rate | > 1% | > 5% | Reduce sampling |
| Result Difference | > 0.5% | > 2% | Review algorithm |
| CPU Usage | > 30% | > 50% | Check thread pools |

## Results: The Transformation

### Performance Improvements

\`\`\`mermaid
graph LR
    subgraph "Before Optimization"
        B1[P95: 4.01s]
        B2[P99: 8.13s]
        B3[CPU: 60%]
        B4[Calc: 0.1s]
    end
    
    subgraph "After Optimization"
        A1[P95: 262ms]
        A2[P99: 350ms]
        A3[CPU: <10%]
        A4[Calc: 0.01s]
    end
    
    B1 -.->|93% faster| A1
    B2 -.->|96% faster| A2
    B3 -.->|83% less| A3
    B4 -.->|10x faster| A4
    
    style A1 fill:#90EE90
    style A2 fill:#90EE90
    style A3 fill:#90EE90
    style A4 fill:#90EE90
\`\`\`

### Detailed Metrics

#### API Latency

- **P95**: 4.01s → 262ms **(93% improvement)**
- **P99**: 8.13s → 350ms **(96% improvement)**
- **Average**: 3s → <300ms **(90% improvement)**

#### Resource Utilization

- **CPU Usage**: ~60% → <10% **(83% reduction)**
- **Memory**: Stable (request-scoped caching)
- **Thread Count**: Optimized (dedicated pools)

#### Calculation Performance

- **Single Calculation**: 0.1s → 0.01s **(10x faster)**
- **Per-Request Overhead**: 600-1000ms → 50-100ms **(85-90% faster)**

#### Business Impact

- Improved user experience with sub-second responses
- 5x throughput capacity increase
- Reduced infrastructure costs
- Better scalability headroom for growth

### Accuracy Validation

- **Identical Results**: 99.95% of cases
- **Minor Differences**: 0.04% (rounding edge cases)
- **Critical Differences**: 0.01% (fixed before prod rollout)

## Key Learnings

### Risk Mitigation First

Shadow testing eliminated deployment fear. We could test aggressive optimizations knowing we could disable shadow instantly if issues arose.

### Metrics Drive Decisions

Comprehensive monitoring was crucial:
- **Latency percentiles** (not just averages)
- **Error rates** by type and severity
- **Result difference distributions**
- **Resource utilization** trends

### Real Data Reveals Edge Cases

Starting at 1% sampling revealed production patterns synthetic tests missed:
- Unusual loan amounts triggering precision issues
- Concurrent modification edge cases
- Cache eviction under memory pressure

### Thread Isolation is Critical

\`\`\`java
// Dedicated thread pool for shadow work
ThreadPoolTaskExecutor shadowExecutor = new ThreadPoolTaskExecutor();
shadowExecutor.setCorePoolSize(5);
shadowExecutor.setMaxPoolSize(10);
shadowExecutor.setQueueCapacity(100);
shadowExecutor.setThreadNamePrefix("shadow-");
shadowExecutor.setRejectedExecutionHandler(
    new ThreadPoolExecutor.CallerRunsPolicy()
);
\`\`\`

Separate pools prevented shadow failures from impacting production requests.

### Configuration Must Be Dynamic

\`\`\`yaml
# Good: Runtime configurable via environment variables
shadow:
  enabled: \${SHADOW_ENABLED:true}
  sampling-rate: \${SHADOW_SAMPLING_RATE:0.01}
\`\`\`

Being able to dial sampling up/down without deployment was crucial during rollout.

## When to Use Shadow Testing

### ✅ Ideal For

- **High-traffic APIs** with strict SLAs
- **Complex business logic** optimizations  
- **Algorithm changes** with subtle behavior
- **Gradual migrations** to new implementations

### ❌ Not Ideal For

- **Write operations** (side effects are risky)
- **Low-traffic endpoints** (insufficient data)
- **Simple code changes** (overkill)
- **Time-sensitive operations** (delay matters)

## Implementation Strategy

Successfully implementing shadow testing requires careful planning across three phases:

### Phase 1: Pre-Deployment

Build shadow infrastructure with dedicated thread pools, externalized configuration, comprehensive metrics, and circuit breaker protection. Ensure comparison logic handles edge cases and passes all tests.

### Phase 2: Gradual Rollout

Deploy disabled initially to verify zero impact, then enable at 1% sampling. Monitor extensively and gradually scale to 5-10% while analyzing statistical significance and accuracy.

### Phase 3: Production Switch

After comprehensive data review and team validation, switch to optimized code while keeping shadow flow active as an ongoing safety net for future optimizations.

## Conclusion

Shadow testing transformed our approach to performance optimization. By eliminating deployment risk, we could safely test aggressive optimizations that would have been too risky otherwise.

**The Results Speak for Themselves:**
- 93-96% latency reduction
- 83% CPU savings  
- 10x faster calculations
- Zero production incidents during rollout

**Key Takeaway**: When optimizing critical production code, the question isn't just "will this work?" but "how can we *prove* it works before it affects users?" Shadow testing provides that proof.

---

*This pattern has been successfully applied to multiple high-traffic APIs, consistently delivering measurable improvements while maintaining production stability. The shadow testing infrastructure remains active as a safety net for ongoing optimizations.*`,
    publishedDate: '2025-01-15',
    tags: ['Backend', 'Performance', 'System Design', 'Java', 'Spring Boot', 'Optimization'],
    readingTime: 15,
    featured: true
  },
  {
    id: 'postgresql-partitioning-at-scale',
    title: 'Managing 130M+ Records: PostgreSQL Partitioning at Scale',
    excerpt: 'How we managed a 181GB PostgreSQL table with 130M+ records using time-range partitioning, achieving automated cleanup and 85% storage reduction while maintaining query performance.',
    content: `# Managing 130M+ Records: PostgreSQL Partitioning at Scale

## The Problem

Our production database was facing critical challenges:

- **Table Size**: 181GB with 130M+ records
- **Monthly Growth**: 9.3GB (13.5M records) per month
- **Dead Tuples**: 73M dead tuples consuming space
- **Free Space**: Only 8GB remaining out of 200GB allocated
- **Autovacuum**: Enabled but ineffective at managing bloat
- **User Impact**: Degrading query performance and approaching storage limits

### Why This Matters

Database bloat isn't just about storage costs—it directly impacts:
- Query performance (scanning bloated pages)
- Backup and restore times
- I/O throughput and latency
- Write availability (risk of disk full errors)

\`\`\`mermaid
graph LR
    A[Table: 181GB] --> B[Live Data: 95M rows]
    A --> C[Dead Tuples: 73M]
    A --> D[Indexes: Bloated]
    
    B --> E[Used: 108GB]
    C --> F[Wasted: 73GB]
    
    style F fill:#ff6b6b
    style E fill:#90EE90
\`\`\`

## Understanding the Root Cause

### The Bloat Accumulation

PostgreSQL's MVCC (Multi-Version Concurrency Control) creates new row versions on updates/deletes. Over time:

1. **High Churn Rate**: Frequent updates/deletes create dead tuples
2. **Autovacuum Lag**: Can't keep up with the volume of changes
3. **Space Not Reclaimed**: VACUUM marks space as reusable but doesn't return it to OS
4. **Growing Pain**: Table continues to grow despite stable active data

### Why Autovacuum Wasn't Helping

\`\`\`text
Autovacuum Threshold Formula:
threshold = vacuum_threshold + (vacuum_scale_factor × total_rows)
         = 50 + (0.1 × 130M)
         = ~13M dead tuples before trigger

With 73M dead tuples, autovacuum SHOULD have run.
Problem: Large table size + conservative cost limits = slow progress
\`\`\`

#### Autovacuum Configuration Analysis

| Parameter | Value | Impact |
|-----------|-------|--------|
| Max Workers | 3 | Limited to 3 concurrent operations across DB |
| Cost Limit | 200 | Too conservative for large tables |
| Scale Factor | 0.1 | Reasonable, but high threshold for huge tables |
| Vacuum Threshold | 50 | Base threshold too low for scale |

## The Solution: Time-Range Partitioning

### Why Partitioning?

Instead of one massive 181GB table, split into manageable time-based chunks:

\`\`\`text
Before Partitioning:
[==================== 181GB Single Table ====================]
                    (all data in one table)

After Partitioning:
[Jan] [Feb] [Mar] [Apr] [May] ... [Nov] [Dec]
 7GB   8GB   7GB   8GB   9GB       8GB   7GB
\`\`\`

**Benefits:**
- **Faster Queries**: Query planner scans only relevant partitions
- **Easy Cleanup**: DROP old partitions instantly (vs slow DELETE)
- **Efficient Vacuuming**: Smaller tables = faster autovacuum
- **Predictable Growth**: Each month is a new partition

### Choosing pg_partman

We evaluated native partitioning vs pg_partman:

| Feature | Native Partitioning | pg_partman |
|---------|---------------------|------------|
| Partition Creation | Manual | **Automated** |
| Retention Policy | Manual DROP | **Automated cleanup** |
| Partition Maintenance | Custom scripts | **Built-in** |
| Performance | Same | Same |
| Monitoring | Manual | **Rich metadata** |

**Decision**: pg_partman for automation and operational ease.

## Implementation Architecture

\`\`\`mermaid
graph TB
    subgraph "Application Layer"
        App[Application]
    end
    
    subgraph "Database Layer"
        Parent[Parent Table<br/>request_detail_partitioned]
        
        subgraph "Partitions by Month"
            P1[Jan 2024<br/>~8GB]
            P2[Feb 2024<br/>~8GB]
            P3[Mar 2024<br/>~9GB]
            P4[Apr 2024<br/>~9GB]
            Pn[... Future]
        end
        
        PgPartman[pg_partman<br/>Extension]
    end
    
    subgraph "Automation"
        Cron[Cron Job<br/>run_maintenance]
        Retention[Retention Policy<br/>Keep 2 months]
    end
    
    App -->|INSERT/SELECT| Parent
    Parent --> P1
    Parent --> P2
    Parent --> P3
    Parent --> P4
    Parent --> Pn
    
    PgPartman -->|Creates| Pn
    Cron -->|Triggers| PgPartman
    Retention -->|Drops Old| P1
    
    style Parent fill:#3b82f6
    style PgPartman fill:#8b5cf6
    style Retention fill:#ef4444
\`\`\`

### Design Decisions

#### 1. Partition Strategy: Time-Range

\`\`\`sql
-- Monthly partitions based on creation timestamp
CREATE TABLE request_detail_partitioned (
    id BIGSERIAL,
    created_at TIMESTAMP NOT NULL,
    -- other columns
) PARTITION BY RANGE (created_at);
\`\`\`

**Why monthly?**
- Aligns with data retention policy (2 months)
- Manageable partition size (~8-10GB each)
- Easy to reason about and troubleshoot
- Natural boundary for business queries

#### 2. Partition Key: created_at

**Considerations:**
- Most queries filter by time range
- Immutable (never updated)
- Natural distribution
- Aligns with retention policy

#### 3. Retention Policy: 2 Months

\`\`\`sql
-- pg_partman configuration
SELECT partman.create_parent(
    p_parent_table := 'public.request_detail_partitioned',
    p_control := 'created_at',
    p_type := 'native',
    p_interval := '1 month',
    p_retention := '2 months',
    p_retention_keep_table := false
);
\`\`\`

**Why 2 months?**
- Meets business requirements for recent data access
- Balances storage costs with data availability
- Provides buffer for reporting and analysis

## Step-by-Step Implementation

### Phase 1: Setup Partitioned Table

\`\`\`sql
-- Install pg_partman extension
CREATE EXTENSION IF NOT EXISTS pg_partman;

-- Create parent partitioned table
CREATE TABLE request_detail_partitioned (
    id BIGSERIAL NOT NULL,
    request_id VARCHAR(255),
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP,
    status VARCHAR(50),
    data JSONB,
    -- additional columns
) PARTITION BY RANGE (created_at);

-- Create primary key and indexes
CREATE INDEX idx_req_detail_part_created 
    ON request_detail_partitioned(created_at);
CREATE INDEX idx_req_detail_part_request_id 
    ON request_detail_partitioned(request_id);
\`\`\`

### Phase 2: Configure pg_partman

\`\`\`sql
-- Initialize partitioning for the table
SELECT partman.create_parent(
    p_parent_table := 'public.request_detail_partitioned',
    p_control := 'created_at',
    p_type := 'native',
    p_interval := '1 month',
    p_premake := 2,  -- Pre-create 2 future partitions
    p_start_partition := '2024-04-01'
);

-- Configure retention
UPDATE partman.part_config 
SET retention = '2 months',
    retention_keep_table = false,
    retention_keep_index = false
WHERE parent_table = 'public.request_detail_partitioned';
\`\`\`

### Phase 3: Automated Maintenance

\`\`\`sql
-- Create maintenance function
CREATE OR REPLACE FUNCTION run_partition_maintenance()
RETURNS void AS $$
BEGIN
    -- Run pg_partman maintenance
    PERFORM partman.run_maintenance_proc();
    
    -- Log maintenance run
    INSERT INTO partition_maintenance_log (run_at, status)
    VALUES (NOW(), 'SUCCESS');
EXCEPTION
    WHEN OTHERS THEN
        INSERT INTO partition_maintenance_log (run_at, status, error)
        VALUES (NOW(), 'FAILED', SQLERRM);
        RAISE;
END;
$$ LANGUAGE plpgsql;

-- Schedule via cron (pg_cron extension)
SELECT cron.schedule(
    'partition-maintenance',
    '0 3 * * *',  -- Run at 3 AM daily
    $$ SELECT run_partition_maintenance(); $$
);
\`\`\`

### Phase 4: Dual-Write Period

To ensure zero downtime, implement dual-write pattern:

\`\`\`java
@Transactional
public void saveRequestDetail(RequestDetail detail) {
    // Write to old table (existing code)
    requestDetailRepository.save(detail);
    
    // Also write to new partitioned table
    if (featureFlags.isPartitionedTableEnabled()) {
        requestDetailPartitionedRepository.save(detail);
    }
}
\`\`\`

**Dual-Write Timeline:**
- **Week 1-2**: Deploy dual-write, verify data consistency
- **Week 3**: Monitor partition creation and maintenance
- **Week 4**: Validate query performance on partitioned table
- **Week 5**: Switch reads to partitioned table
- **Week 6**: Deprecate old table writes

## Query Performance Optimization

### Partition Pruning

PostgreSQL automatically prunes irrelevant partitions:

\`\`\`sql
-- Query with time filter (only scans relevant partition)
EXPLAIN ANALYZE
SELECT * FROM request_detail_partitioned
WHERE created_at >= '2024-04-01'
  AND created_at < '2024-05-01'
  AND status = 'COMPLETED';

-- Result: Only April partition scanned
-- Partitions pruned: 11 out of 12
\`\`\`

#### Performance Comparison

| Query Type | Before (Single Table) | After (Partitioned) | Improvement |
|------------|----------------------|---------------------|-------------|
| Recent data (1 month) | 2.3s | 0.3s | **87% faster** |
| Time-range scan | 5.1s | 0.8s | **84% faster** |
| Full table scan | 12.5s | 11.8s | 6% faster |
| INSERT | 15ms | 12ms | 20% faster |

### Index Strategy

\`\`\`sql
-- Indexes are automatically created on each partition
-- Parent table indexes template child partitions

-- Global index (on parent)
CREATE INDEX idx_global_status 
    ON request_detail_partitioned(status);

-- Partition-local indexes (automatically inherited)
-- request_detail_partitioned_p2024_04: idx_global_status
-- request_detail_partitioned_p2024_05: idx_global_status
\`\`\`

### Query Patterns Optimized

#### Pattern 1: Recent Data Access

\`\`\`sql
-- Most common: Get last 7 days
SELECT * FROM request_detail_partitioned
WHERE created_at >= CURRENT_DATE - INTERVAL '7 days'
  AND request_id = 'REQ123';

-- Partitions scanned: 1 (current month)
-- Execution time: ~50ms (vs 800ms before)
\`\`\`

#### Pattern 2: Monthly Reports

\`\`\`sql
-- Monthly aggregation
SELECT DATE_TRUNC('day', created_at) as day,
       COUNT(*) as total_requests,
       AVG(processing_time_ms) as avg_time
FROM request_detail_partitioned
WHERE created_at >= '2024-04-01'
  AND created_at < '2024-05-01'
GROUP BY day
ORDER BY day;

-- Single partition scan: ~200ms
\`\`\`

#### Pattern 3: Cross-Partition Queries

\`\`\`sql
-- Without time filter: scans all partitions
SELECT COUNT(*) FROM request_detail_partitioned
WHERE status = 'FAILED';

-- Performance: Similar to original table
-- Optimization: Add time filter when possible
\`\`\`

## Monitoring & Observability

### Partition Health Check

\`\`\`sql
-- View all partitions and their sizes
SELECT 
    schemaname,
    tablename,
    pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as size,
    (SELECT COUNT(*) FROM pg_class c WHERE c.oid = (schemaname||'.'||tablename)::regclass::oid) as row_estimate
FROM pg_tables
WHERE tablename LIKE 'request_detail_partitioned_p%'
ORDER BY tablename DESC;
\`\`\`

#### Sample Output

\`\`\`text
tablename                            | size   | rows
-------------------------------------|--------|------------
request_detail_partitioned_p2024_12  | 9.2 GB | 14.2M
request_detail_partitioned_p2024_11  | 8.7 GB | 13.5M
request_detail_partitioned_p2024_10  | 8.3 GB | 12.8M
\`\`\`

### Automated Alerts

\`\`\`sql
-- Check for missing future partitions
SELECT * FROM partman.check_unique_constraint(
    'public.request_detail_partitioned'
);

-- Alert if less than 1 future partition exists
SELECT 
    parent_table,
    premake,
    (SELECT COUNT(*) FROM pg_tables 
     WHERE tablename LIKE parent_table || '_p%' 
     AND tablename > parent_table || '_p' || TO_CHAR(NOW(), 'YYYY_MM'))
    as future_partitions
FROM partman.part_config
WHERE parent_table = 'public.request_detail_partitioned'
HAVING future_partitions < 1;
\`\`\`

### Maintenance Logs

\`\`\`sql
CREATE TABLE partition_maintenance_log (
    id SERIAL PRIMARY KEY,
    run_at TIMESTAMP DEFAULT NOW(),
    partitions_created INT,
    partitions_dropped INT,
    status VARCHAR(20),
    duration_ms INT,
    error TEXT
);

-- Query recent maintenance runs
SELECT 
    run_at,
    partitions_created,
    partitions_dropped,
    duration_ms,
    status
FROM partition_maintenance_log
ORDER BY run_at DESC
LIMIT 10;
\`\`\`

## Results & Impact

### Storage Optimization

\`\`\`mermaid
graph LR
    subgraph "Before"
        B1[181GB<br/>Single Table]
    end
    
    subgraph "After 2 Months"
        A1[18GB<br/>Current Month]
        A2[17GB<br/>Previous Month]
        A3[Dropped<br/>146GB freed]
    end
    
    B1 -.->|Migration| A1
    B1 -.->|Migration| A2
    B1 -.->|Cleanup| A3
    
    style B1 fill:#ff6b6b
    style A1 fill:#90EE90
    style A2 fill:#90EE90
    style A3 fill:#ffd93d
\`\`\`

#### Metrics

**Storage Impact:**
- **Before**: 181GB total, 8GB free (96% used)
- **After**: 35GB active, 165GB free (17% used)
- **Reduction**: 85% storage freed
- **Cost Savings**: ~$300/year (AWS RDS gp3 pricing)

**Performance Impact:**
- **Query Latency**: 85% reduction for time-filtered queries
- **Autovacuum**: Now effective on smaller partitions
- **INSERT Performance**: 20% improvement
- **Maintenance Window**: Reduced from hours to minutes

**Operational Impact:**
- **Automated Cleanup**: No manual intervention needed
- **Predictable Growth**: 9GB/month, old data auto-dropped
- **Monitoring**: Clear visibility into partition health
- **Disaster Recovery**: Faster backup/restore (smaller dataset)

## Key Learnings

### Start with Clear Retention Requirements

Don't partition for the sake of partitioning. We had a clear business rule: "Keep 2 months of data." This drove our design.

### Partition Size Matters

Too small: Overhead from many partitions  
Too large: Defeats the purpose  
**Sweet spot**: 5-15GB per partition for our workload

### Dual-Write for Safety

Never directly migrate production data. Dual-write period gave us:
- Confidence in data consistency
- Easy rollback path
- Validation period

### Monitor Autovacuum on Partitions

\`\`\`sql
-- Check autovacuum activity per partition
SELECT 
    relname,
    last_autovacuum,
    n_dead_tup,
    n_live_tup,
    ROUND(100.0 * n_dead_tup / NULLIF(n_live_tup + n_dead_tup, 0), 2) as dead_ratio
FROM pg_stat_user_tables
WHERE relname LIKE 'request_detail_partitioned_p%'
ORDER BY dead_ratio DESC;
\`\`\`

Smaller partitions mean autovacuum runs more frequently and completes faster.

### Plan for Query Patterns

Our queries mostly filtered by time → Perfect for time-range partitioning  
If your queries don't filter by partition key → Reconsider partitioning strategy

## When to Use Partitioning

### ✅ Good Fit

- **Time-series data** with natural retention periods
- **Large tables** (>50GB) with query patterns filtering on partition key
- **Write-heavy** workloads with frequent deletes
- **Compliance requirements** for data retention/deletion
- **Predictable growth** patterns

### ❌ Not Ideal

- **Small tables** (<10GB) where overhead outweighs benefits
- **Random access patterns** not filtering by partition key
- **Complex JOINs** across many partitions
- **Frequently changing partition keys**

## Best Practices Checklist

### Planning Phase
- [ ] Identify clear retention requirements
- [ ] Analyze query patterns and WHERE clauses
- [ ] Choose appropriate partition interval (daily/weekly/monthly)
- [ ] Estimate partition sizes and growth rate
- [ ] Plan partition key (immutable, in most queries)

### Implementation Phase
- [ ] Install pg_partman extension
- [ ] Create partitioned parent table
- [ ] Configure automated maintenance
- [ ] Set up monitoring and alerts
- [ ] Implement dual-write pattern

### Testing Phase
- [ ] Validate query performance on test data
- [ ] Test partition creation/dropping
- [ ] Verify autovacuum behavior
- [ ] Load test at expected scale
- [ ] Practice rollback procedures

### Production Phase
- [ ] Enable dual-write
- [ ] Monitor for data consistency
- [ ] Gradually shift read traffic
- [ ] Validate old partition dropping
- [ ] Document runbooks for operations team

## Conclusion

PostgreSQL partitioning transformed our database from a storage crisis to a well-managed, scalable system. By implementing time-range partitioning with pg_partman, we:

**Achieved:**
- 85% storage reduction (181GB → 35GB)
- 85% faster queries for time-filtered operations
- Automated data retention and cleanup
- Predictable, sustainable growth pattern

**Key Takeaway**: Partitioning is a powerful tool, but it's not magic. Success requires:
1. Clear business requirements (retention policy)
2. Query patterns that align with partition key
3. Proper tooling (pg_partman for automation)
4. Careful migration strategy (dual-write)
5. Ongoing monitoring and maintenance

When done right, partitioning transforms a scaling problem into a solved problem.

---

*This architecture has been running in production for 6+ months, managing 130M+ records with zero manual interventions and consistent sub-second query performance.*`,
    publishedDate: '2025-01-22',
    tags: ['Backend', 'PostgreSQL', 'Database', 'Performance', 'System Design', 'Optimization'],
    readingTime: 14,
    featured: true
  },
  {
    id: 'android-to-backend-journey',
    title: 'From Android Development to Backend Engineering: My Journey',
    excerpt: 'How my experience with Android development shaped my approach to backend engineering and system design.',
    content: `# From Android Development to Backend Engineering: My Journey

## The Beginning

My journey into software development started with Android development. For 6-7 months, I immersed myself in mobile app development, building everything from medical diagnosis apps to client-server applications.

## Android Development Experience

### Medical Diagnosis App
- **Architecture**: MVVM pattern with Room database
- **Challenges**: Offline data synchronization
- **Learning**: Importance of clean architecture

### Client Server App
- **Technology**: Retrofit for API integration
- **Challenges**: Handling network failures gracefully
- **Learning**: Robust error handling patterns

## Transition to Backend

The transition from Android to backend development wasn't just a career change—it was a mindset shift:

### From Client to Server Perspective
- **Android**: Consuming APIs, handling UI states
- **Backend**: Creating APIs, managing data flow
- **Common Ground**: Both require solid architecture

### Shared Principles
1. **Clean Architecture** - Separation of concerns applies everywhere
2. **Error Handling** - Graceful failure handling is crucial
3. **Performance** - Optimization matters on both sides
4. **Testing** - Unit tests are essential

## How Android Experience Helped

### API Design
Understanding the client side helped me design better APIs:
- **Consistent response formats**
- **Meaningful error codes**
- **Efficient data structures**

### Mobile-First Thinking
- **Bandwidth considerations** in API design
- **Offline capabilities** in system architecture
- **Battery optimization** translates to server efficiency

### User Experience Focus
Android development taught me to think about the end user, which influences:
- **API response times**
- **Error message clarity**
- **Feature prioritization**

## Current Focus

Now as a backend developer, I bring mobile development insights to server-side architecture:
- **Microservices** design with mobile clients in mind
- **Real-time systems** for better user experiences
- **Performance optimization** from both perspectives

## Advice for Developers

1. **Don't see it as switching** - See it as expanding your skill set
2. **Leverage cross-platform knowledge** - Understanding both sides makes you better
3. **Keep learning** - Technology evolves rapidly
4. **Build projects** - Hands-on experience is invaluable

The journey from Android to backend has been enriching. Each experience builds on the other, creating a more complete understanding of software systems.`,
    publishedDate: '2024-03-10',
    tags: ['Personal', 'Android', 'Backend', 'Career'],
    readingTime: 5,
    featured: false
  },
  {
    id: 'poetry-in-code',
    title: 'Finding Poetry in Code: A Developer\'s Creative Side',
    excerpt: 'Exploring the intersection of creative writing and software development, and how both disciplines inform each other.',
    content: `# Finding Poetry in Code: A Developer's Creative Side

## The Unexpected Connection

Most people don't associate software development with creative writing, but I've found striking parallels between crafting code and composing poetry.

## Structure and Rhythm

### In Poetry
\`\`\`
Roses are red,
Violets are blue,
Code can be art,
And poetry too.
\`\`\`

### In Code
\`\`\`java
public class Poetry {
    private String emotion;
    private String rhythm;
    
    public Poetry(String emotion, String rhythm) {
        this.emotion = emotion;
        this.rhythm = rhythm;
    }
}
\`\`\`

Both require:
- **Structure** - Stanzas vs. classes
- **Rhythm** - Meter vs. clean method flow
- **Meaning** - Message vs. functionality

## Creative Problem Solving

### Writing Process
1. **Brainstorm** - Generate ideas
2. **Draft** - Write first version
3. **Refine** - Edit and improve
4. **Polish** - Final touches

### Coding Process
1. **Design** - Plan architecture
2. **Implement** - Write initial code
3. **Refactor** - Improve and optimize
4. **Test** - Ensure quality

## My Creative Outlets

### Poetry
- **Themes**: Nature, technology, human experience
- **Forms**: Free verse, sonnets, haikus
- **Inspiration**: Daily life, emotions, observations

### Short Stories
- **Genres**: Science fiction, contemporary fiction
- **Themes**: Human-technology interaction
- **Style**: Character-driven narratives

### Calligraphy
- **Scripts**: Devanagari, Latin
- **Tools**: Traditional pens, digital tablets
- **Projects**: Quotes, poems, artistic pieces

## How Creativity Enhances Development

### Pattern Recognition
- **Poetry**: Recognizing rhythm and meter
- **Code**: Identifying design patterns and antipatterns

### Attention to Detail
- **Writing**: Every word matters
- **Development**: Every line of code counts

### Communication
- **Literature**: Conveying complex emotions
- **Tech**: Explaining complex systems

## A Personal Poem

*"In circuits and verses, I find my voice,  
Where logic meets art, I make my choice.  
Each function a stanza, each class a verse,  
In the poetry of code, I immerse."*

## Balancing Both Worlds

### Time Management
- **Morning**: Creative writing (fresh mind)
- **Day**: Development work (focused energy)
- **Evening**: Reading and reflection

### Cross-Pollination
- **Technical writing** benefits from creative skills
- **Code documentation** becomes more engaging
- **Problem-solving** gains creative approaches

## For Fellow Developers

1. **Explore creative outlets** - They enhance technical skills
2. **Read widely** - Literature improves communication
3. **Write regularly** - Practice makes perfect
4. **Share your work** - Community feedback is valuable

Creativity isn't separate from technical work—it's an integral part of being a well-rounded developer. The discipline of creative writing has made me a better programmer, and programming has given structure to my creative pursuits.`,
    publishedDate: '2024-04-05',
    tags: ['Personal', 'Writing', 'Creativity', 'Poetry'],
    readingTime: 4,
    featured: false
  },
  {
    id: 'database-design-patterns',
    title: 'Database Design Patterns for Scalable Applications',
    excerpt: 'Essential database design patterns and anti-patterns learned from building systems that handle millions of transactions.',
    content: `# Database Design Patterns for Scalable Applications

## Introduction

Working with high-transaction systems at Navi Technologies taught me valuable lessons about database design. Here are the patterns that have proven most effective.

## Core Design Patterns

### 1. Repository Pattern
\`\`\`java
@Repository
public class UserRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;
    
    public User findById(Long id) {
        return jdbcTemplate.queryForObject(
            "SELECT * FROM users WHERE id = ?", 
            new Object[]{id}, 
            new UserRowMapper()
        );
    }
}
\`\`\`

### 2. Connection Pooling
\`\`\`properties
# HikariCP configuration
spring.datasource.hikari.maximum-pool-size=20
spring.datasource.hikari.minimum-idle=5
spring.datasource.hikari.connection-timeout=30000
spring.datasource.hikari.idle-timeout=600000
\`\`\`

### 3. Read/Write Separation
- **Write operations**: Master database
- **Read operations**: Replica databases
- **Load balancing**: Distribute read queries

## Scaling Patterns

### Horizontal Partitioning (Sharding)
\`\`\`sql
-- Shard by user ID
SELECT * FROM users_shard_1 WHERE user_id BETWEEN 1 AND 1000000;
SELECT * FROM users_shard_2 WHERE user_id BETWEEN 1000001 AND 2000000;
\`\`\`

### Vertical Partitioning
- **User profile**: Basic information
- **User preferences**: Settings and configurations
- **User activity**: Logs and analytics

## Performance Optimization

### Index Strategy
\`\`\`sql
-- Composite index for common queries
CREATE INDEX idx_user_status_created ON users(status, created_at);

-- Partial index for active users
CREATE INDEX idx_active_users ON users(email) WHERE status = 'ACTIVE';
\`\`\`

### Query Optimization
\`\`\`java
// Avoid N+1 queries
@Query("SELECT u FROM User u LEFT JOIN FETCH u.profiles WHERE u.id IN :ids")
List<User> findUsersWithProfiles(@Param("ids") List<Long> ids);
\`\`\`

## Anti-Patterns to Avoid

### 1. God Tables
❌ **Don't**: Single table with 50+ columns
✅ **Do**: Normalize into related tables

### 2. Premature Optimization
❌ **Don't**: Over-index without measurement
✅ **Do**: Profile queries and optimize based on data

### 3. Ignoring Transactions
❌ **Don't**: Assume single operations are atomic
✅ **Do**: Use transactions for data consistency

## Real-World Example

At Navi Technologies, we redesigned our transaction processing system:

### Before
- **Single transactions table**: 20+ columns
- **Response time**: 2-3 seconds
- **Concurrent users**: Limited to 100

### After
- **Normalized schema**: 5 related tables
- **Response time**: 200-300ms
- **Concurrent users**: 1000+
- **Horizontal scaling**: Ready for sharding

## Key Takeaways

1. **Design for your use case** - Not all patterns apply everywhere
2. **Measure before optimizing** - Profile your queries
3. **Plan for growth** - Consider future scaling needs
4. **Test thoroughly** - Database changes are risky

Database design is both an art and a science. The patterns that work best are those that align with your specific use case and growth trajectory.`,
    publishedDate: '2024-05-15',
    tags: ['Backend', 'Database', 'System Design', 'Performance'],
    readingTime: 7,
    featured: true
  }
]

export const blogTags = [
  'Backend',
  'System Design',
  'Performance',
  'Java',
  'Spring Boot',
  'Database',
  'Microservices',
  'Architecture',
  'Android',
  'Personal',
  'Writing',
  'Poetry',
  'Career',
  'Creativity'
]
