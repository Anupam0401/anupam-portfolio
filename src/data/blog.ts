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
