# Causal inference

Causal inference is the task of determining the effect of an intervention or treatment on an outcome. Unlike associational inference (estimation, regression), it asks: what would happen if we *did* something? It targets interventional and counterfactual quantities that are not identifiable from observational data alone without additional assumptions. It is central to clinical trials, policy evaluation, and machine learning.

This page is organized around Pearl's **ladder of causation** (see [The ladder of causation](#the-ladder-of-causation)): rung 1 handles *association* (what observing tells us), rung 2 handles *intervention* (what doing causes), rung 3 handles *counterfactuals* (what would have happened otherwise). Each section below climbs one rung or provides the tools to climb.

> **Authoritative sources**
> - [J. Pearl, Causality: Models, Reasoning, and Inference (2009)](https://doi.org/10.1017/CBO9780511803161)
> - [J. Pearl & D. Mackenzie, The Book of Why: The New Science of Cause and Effect (2018)](https://www.wiley.com/en-us/The+Book+of+Why%3A+The+New+Science+of+Cause+and+Effect-p-9781119186847)
> - [M. A. Hernán & J. M. Robins, Causal Inference: What If (2020)](https://www.hbs.edu/faculty/Pages/profile.aspx?facId=653588)
> - [C. Hitchcock, "The do-calculus", Stanford Encyclopedia of Philosophy (2018)](https://plato.stanford.edu/entries/causal-models/do-calculus.html)

## Structural causal models

A **structural causal model** (SCM) is a directed acyclic graph (DAG) $`G = (V, E)` with a structural equation for each node:

```math
X_i = f_i(\text{Pa}(X_i), U_i)
```

where $`\text{Pa}(X_i)` are the parents of $`X_i` in the graph and $`U_i` are exogenous (unobserved) noise variables.

<svg width="280" height="140" viewBox="0 0 280 140" xmlns="http://www.w3.org/2000/svg" style="display:block;margin:1em auto;">
  <defs><marker id="ah1" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#333"/></marker></defs>
  <!-- U node (confounder) -->
  <circle cx="140" cy="30" r="20" fill="#f9d71d" stroke="#333" stroke-width="1.5"/>
  <text x="140" y="35" text-anchor="middle" font-size="13" font-weight="bold" fill="#333">U</text>
  <!-- X node -->
  <circle cx="50" cy="110" r="20" fill="#a8d8ea" stroke="#333" stroke-width="1.5"/>
  <text x="50" y="115" text-anchor="middle" font-size="13" font-weight="bold" fill="#333">X</text>
  <!-- Y node -->
  <circle cx="230" cy="110" r="20" fill="#f4a261" stroke="#333" stroke-width="1.5"/>
  <text x="230" y="115" text-anchor="middle" font-size="13" font-weight="bold" fill="#333">Y</text>
  <!-- Edges -->
  <line x1="125" y1="45" x2="62" y2="95" stroke="#333" stroke-width="1.5" marker-end="url(#ah1)"/>
  <line x1="155" y1="45" x2="218" y2="95" stroke="#333" stroke-width="1.5" marker-end="url(#ah1)"/>
  <!-- Labels -->
  <text x="80" y="70" font-size="11" fill="#666">confounds</text>
  <text x="175" y="70" font-size="11" fill="#666">confounds</text>
</svg>

<details><summary>Details</summary>

The DAG encodes causal assumptions: an edge $`X \to Y` means $`X` is a direct cause of $`Y`. The model generates a joint distribution $`P(X_1, \ldots, X_n)` that is *Markov* with respect to the graph: each variable is independent of its non-descendants given its parents.

**Example.** A simple SCM for a drug trial:

```math
\text{Drug} \to \text{Recovery}, \quad \text{Age} \to \text{Recovery}, \quad \text{Age} \to \text{Drug}
```

Here, Age is a **confounder**: it affects both the treatment assignment and the outcome. The associational effect of Drug on Recovery is confounded by Age.

The SCM framework makes explicit the distinction between *associational* quantities (read off the observed distribution) and *interventional* quantities (require modifying the model). This is the key insight that separates causal inference from [Estimation](./Estimation.md) and [Hypothesis testing](./Hypothesis-testing.md).

</details>

## The do-operator

The **do-operator** $`\text{do}(X = x)` represents an intervention: setting $`X` to $`x` by external force, breaking its incoming edges. The interventional distribution is

```math
P(Y \mid \text{do}(X = x))
```

<details><summary>Details</summary>

The do-operator modifies the SCM: the structural equation for $`X` is replaced by $`X = x` (a constant), and all incoming edges to $`X` are removed. The resulting distribution is the **interventional distribution**.

Key distinction:
- $`P(Y \mid X = x)` (associational): the distribution of $`Y` among units that *happen to have* $`X = x`.
- $`P(Y \mid \text{do}(X = x))` (interventional): the distribution of $`Y` if we *force* $`X = x`.

These are equal if and only if there is no confounding (i.e., $`X` is independent of the potential outcomes). In general, $`P(Y \mid X = x) \neq P(Y \mid \text{do}(X = x))`.

**Example.** In the drug trial SCM, $`P(\text{Recovery} \mid \text{Drug} = 1)` is confounded by Age (older patients are more likely to receive the drug and less likely to recover). But $`P(\text{Recovery} \mid \text{do}(\text{Drug} = 1))` gives the true causal effect, free of confounding.

</details>

## The ladder of causation

Pearl and Mackenzie organize all causal reasoning into three rungs, each answering a question that the previous rung cannot:

<table>
<tr><th>Rung</th><th>Activity</th><th>Typical question</th><th>Typical quantity</th></tr>
<tr><td>1. Association</td><td>Seeing</td><td>What does observing X tell me about Y?</td><td>P(Y | X = x)</td></tr>
<tr><td>2. Intervention</td><td>Doing</td><td>What happens to Y if I make X = x?</td><td>P(Y | do(X = x))</td></tr>
<tr><td>3. Counterfactuals</td><td>Imagining</td><td>What would have happened had X been different?</td><td>P(Y<sub>x'</sub> | X = x, Y = y)</td></tr>
</table>

<svg width="560" height="190" viewBox="0 0 560 190" xmlns="http://www.w3.org/2000/svg" style="display:block;margin:1em auto;">
  <rect x="20" y="130" width="160" height="40" rx="6" fill="#a8d8ea" stroke="#333" stroke-width="1.5"/>
  <text x="100" y="148" text-anchor="middle" font-size="13" font-weight="bold" fill="#333">1. Association</text>
  <text x="100" y="163" text-anchor="middle" font-size="11" fill="#333">seeing: P(Y | X)</text>
  <rect x="200" y="80" width="160" height="40" rx="6" fill="#f4a261" stroke="#333" stroke-width="1.5"/>
  <text x="280" y="98" text-anchor="middle" font-size="13" font-weight="bold" fill="#333">2. Intervention</text>
  <text x="280" y="113" text-anchor="middle" font-size="11" fill="#333">doing: P(Y | do(X))</text>
  <rect x="380" y="30" width="160" height="40" rx="6" fill="#b5e8b5" stroke="#333" stroke-width="1.5"/>
  <text x="460" y="48" text-anchor="middle" font-size="13" font-weight="bold" fill="#333">3. Counterfactuals</text>
  <text x="460" y="63" text-anchor="middle" font-size="11" fill="#333">imagining: P(Y_x' | X, Y)</text>
  <line x1="185" y1="140" x2="205" y2="122" stroke="#666" stroke-width="1.5"/>
  <line x1="365" y1="90" x2="385" y2="72" stroke="#666" stroke-width="1.5"/>
  <text x="280" y="175" text-anchor="middle" font-size="11" fill="#666">each rung answers questions the lower rungs cannot</text>
</svg>

Each rung strictly subsumes the ones below it: a model rich enough for counterfactuals answers interventional and associational questions, but an associational model alone cannot answer interventional questions. The sections of this page climb the ladder: [structural causal models](#structural-causal-models) and [the do-operator](#the-do-operator) set up the language; [identifiability and do-calculus](#identifiability-and-do-calculus), [potential outcomes](#potential-outcomes-framework), and [instrumental variables](#instrumental-variables) all work at rung 2; [counterfactuals](#counterfactuals) work at rung 3. Note that rung 1 is the domain of ordinary statistics — see [Estimation](./Estimation.md) and [Conditional probability](../Conditional-probability.md).

<details><summary>Details</summary>

The ladder explains *why* causal inference needs extra assumptions: the observed distribution $`P(V)` is a rung-1 object, and the map from rung-1 objects to rung-2 or rung-3 objects is not unique without causal assumptions. Two different SCMs can induce the same observational distribution but different interventional distributions; only the causal structure (the arrows) breaks the tie. This is why identifying $`P(Y \mid \text{do}(X))` from data requires either an experiment (which intervenes directly) or untestable structural assumptions (which the graphical criteria below encode).

**Example.** Observing that barometer readings predict rain (rung 1) does not tell you whether twisting the dial will cause rain (rung 2). The DAG $`\text{Pressure} \to \text{Barometer}` and $`\text{Pressure} \to \text{Rain}` explains both: the association is real, but there is no causal path from the barometer to the rain.

</details>

## Identifiability and do-calculus

An interventional quantity $`P(Y \mid \text{do}(X))` is **identifiable** if it can be expressed as a function of the observed (associational) distribution $`P(V)`. Pearl's **do-calculus** provides three rules for transforming interventional queries into associational ones. Write $`G_{\bar{X}}` for the graph obtained from $`G` by deleting all arrows pointing *into* $`X`, $`G_{\underline{Z}}` for deleting all arrows pointing *out of* $`Z`, and $`G_{\bar{X}, \underline{Z}}` for both. The rules, for disjoint sets $`X, Y, Z, W`:

1. **Insertion/deletion of observations**: $`P(y \mid \text{do}(x), z, w) = P(y \mid \text{do}(x), w)` if $`Y` and $`Z` are d-separated by $`X \cup W` in $`G_{\bar{X}}` (arrows into $`X` removed).
2. **Action/observation exchange**: $`P(y \mid \text{do}(x), \text{do}(z), w) = P(y \mid \text{do}(x), z, w)` if $`Y` and $`Z` are d-separated by $`X \cup W` in $`G_{\bar{X}, \underline{Z}}` (arrows into $`X` removed and arrows out of $`Z` removed).
3. **Insertion/deletion of actions**: $`P(y \mid \text{do}(x), \text{do}(z), w) = P(y \mid \text{do}(x), w)` if $`Y` and $`Z` are d-separated by $`X \cup W` in $`G_{\bar{X}, \underline{Z}(\bar{W})}` (arrows into $`X` removed, and arrows into $`Z` removed except those into nodes that are ancestors of $`W` in $`G_{\bar{X}}`).

Rule 1 says an observation can be dropped when it carries no extra information; rule 2 says an intervention can be replaced by a mere observation when the intervention is irrelevant; rule 3 says an intervention can be dropped when it is redundant. The calculus is **complete** (Huang & Valtorta 2006; Shpitser & Pearl 2006): every identifiable interventional quantity can be derived with these three rules.

### The back-door criterion

The most used graphical criterion is the **back-door criterion**: a set $`Z` satisfies the back-door criterion relative to $`(X, Y)` if it blocks all back-door paths from $`X` to $`Y` (paths ending with an arrow into $`X`) and contains no descendant of $`X`. Then

```math
P(Y \mid \text{do}(X = x)) = \sum_z P(Y \mid X = x, Z = z)\, P(Z = z)
```

This is the **adjustment formula**: it says that conditioning on the right set of covariates (confounders) removes confounding bias.

### The front-door criterion

When unobserved confounders block every admissible adjustment set, the **front-door criterion** can still identify the effect. If there is a mediator $`M` such that (i) $`X \to M \to Y` is the only path from $`X` to $`M` (no unblocked back-door path from $`X` to $`M`), (ii) all back-door paths from $`M` to $`Y` are blocked by $`X`, and (iii) all $`X \to Y` paths are blocked by $`M`, then the causal effect is identifiable via the **front-door formula**:

```math
P(Y \mid \text{do}(X = x)) = \sum_m P(M = m \mid X = x) \sum_{x'} P(Y \mid M = m, X = x')\, P(X = x')
```

<svg width="320" height="140" viewBox="0 0 320 140" xmlns="http://www.w3.org/2000/svg" style="display:block;margin:1em auto;">
  <defs><marker id="ah2" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#333"/></marker></defs>
  <!-- U node -->
  <circle cx="160" cy="25" r="18" fill="#f9d71d" stroke="#333" stroke-width="1.5"/>
  <text x="160" y="30" text-anchor="middle" font-size="12" font-weight="bold" fill="#333">U</text>
  <!-- X node -->
  <circle cx="40" cy="100" r="18" fill="#a8d8ea" stroke="#333" stroke-width="1.5"/>
  <text x="40" y="105" text-anchor="middle" font-size="12" font-weight="bold" fill="#333">X</text>
  <!-- M node -->
  <circle cx="160" cy="100" r="18" fill="#b5e8b5" stroke="#333" stroke-width="1.5"/>
  <text x="160" y="105" text-anchor="middle" font-size="12" font-weight="bold" fill="#333">M</text>
  <!-- Y node -->
  <circle cx="280" cy="100" r="18" fill="#f4a261" stroke="#333" stroke-width="1.5"/>
  <text x="280" y="105" text-anchor="middle" font-size="12" font-weight="bold" fill="#333">Y</text>
  <!-- Edges -->
  <line x1="145" y1="38" x2="52" y2="87" stroke="#333" stroke-width="1.5" marker-end="url(#ah2)"/>
  <line x1="175" y1="38" x2="268" y2="87" stroke="#333" stroke-width="1.5" marker-end="url(#ah2)"/>
  <line x1="58" y1="100" x2="142" y2="100" stroke="#333" stroke-width="1.5" marker-end="url(#ah2)"/>
  <line x1="178" y1="100" x2="262" y2="100" stroke="#333" stroke-width="1.5" marker-end="url(#ah2)"/>
  <!-- Dashed edge X→Y (confounded direct) -->
  <line x1="58" y1="112" x2="262" y2="112" stroke="#c0392b" stroke-width="1.2" stroke-dasharray="5,3" marker-end="url(#ah2)"/>
  <text x="160" y="130" text-anchor="middle" font-size="10" fill="#c0392b">confounded direct path</text>
</svg>

<details><summary>Details</summary>

**Why the front-door works.** The effect of $`X` on $`M` is identifiable by the back-door criterion with $`Z = \emptyset` (condition (i) rules out confounding of $`X`–$`M`). The effect of $`M` on $`Y` is identifiable by adjusting for $`X` (condition (ii)). Condition (iii) ensures the effect of $`X` on $`Y` is fully transmitted through $`M`, so the two identifiable pieces compose into the front-door formula. The derivation is a short chain of do-calculus rules — this is exactly what the calculus is for.

**Example.** Smoking ($`X`), tar deposits in the lungs ($`M`), and cancer ($`Y`), with an unobserved confounder $`U` (e.g., a genetic predisposition) affecting both smoking and cancer. No set of observed variables blocks the back-door path $`X \leftarrow U \to Y`. But tar deposits mediate the effect, and the front-door formula recovers the effect of smoking on cancer from observational data alone.

The back-door and front-door criteria are the two workhorse *graphical* identification results; the do-calculus is the general machine that generates them (and many others, such as instrumental-variable-type identifications).

</details>

## Potential outcomes framework

The **potential outcomes** (Rubin) framework represents causality at the level of individual units. For a binary treatment $`X \in \{0, 1\}` and outcome $`Y`, each unit $`i` has two potential outcomes:

```math
Y_i(1) \quad \text{(outcome if treated)}, \qquad Y_i(0) \quad \text{(outcome if untreated)}
```

The **individual causal effect** is $`Y_i(1) - Y_i(0)`, but only one of the two is ever observed (the **fundamental problem of causal inference**). The **average treatment effect** (ATE) is

```math
\text{ATE} = E[Y(1) - Y(0)] = E[Y(1)] - E[Y(0)]
```

<details><summary>Details</summary>

The two main frameworks for causal inference are:

<table>
<tr><th>Framework</th><th>Key objects</th><th>Identifiability condition</th></tr>
<tr><td>Structural (Pearl)</td><td>DAG + structural equations</td><td>do-calculus / back-door / front-door</td></tr>
<tr><td>Potential outcomes (Rubin)</td><td>Y<sub>i</sub>(0), Y<sub>i</sub>(1) per unit</td><td>Unconfoundedness / ignorability</td></tr>
</table>

In the potential outcomes framework, the key assumption is **unconfoundedness** (also called ignorability or selection on observables):

```math
(Y(0), Y(1)) \perp\!\!\!\perp X
```

i.e., potential outcomes are independent of treatment assignment. Unconfoundedness with no covariates corresponds exactly to the back-door criterion with the empty set $`Z = \emptyset` (no confounders). Its conditional version, $`(Y(0), Y(1)) \perp\!\!\!\perp X \mid Z` for observed covariates $`Z`, corresponds exactly to the back-door criterion with adjustment set $`Z`.

The two frameworks are mathematically equivalent: any SCM induces a set of potential outcomes, and any set of potential outcomes satisfying consistency and unconfoundedness can be represented by an SCM.

**Connection to the do-operator.** In the potential outcomes framework, $`E[Y \mid \text{do}(X = 1)] = E[Y(1)]` and $`E[Y \mid \text{do}(X = 0)] = E[Y(0)]`. The ATE is the difference of interventional means.

</details>

### SUTVA

Both frameworks rest on the **Stable Unit Treatment Value Assumption** (SUTVA), which has two components:

1. **No interference**: the potential outcome of unit $`i` does not depend on the treatment assigned to any other unit $`j \neq i`. Formally, $`Y_i` is a function of unit $`i`'s own treatment alone. This fails with spillover effects, e.g., vaccination (herd immunity), or when units compete for a shared resource.
2. **Consistency**: the observed outcome for a unit under treatment $`x` equals the potential outcome for that treatment: $`Y = Y_i(x)` whenever $`X_i = x`. This requires the treatment to be well-defined — "the drug" must mean one thing, not a family of doses and regimens.

Under SUTVA, the observed data are simply the potential outcomes with one of the two masked per unit, which is what makes the identification results above applicable.

<details><summary>Details</summary>

as functions of the full assignment vector $`\mathbf{x}`.

**Example.** In a vaccine trial, if vaccinated individuals reduce transmission, unvaccinated individuals in the same villages are partially protected too. Estimating the *direct* effect requires care (e.g., cluster randomization); the *total* effect includes these spillovers and violates the plain SUTVA setup.

**Why consistency matters.** Consistency links the observational data to the potential-outcome notation: without it, "treated" in the data may not correspond to any single well-defined intervention, and $`E[Y \mid X = 1]` cannot be connected to $`E[Y(1)]`. This is a practical concern when treatments are heterogeneous (e.g., "smoking" covers many intensities).

</details>

## Instrumental variables

An **instrumental variable** $`Z` for the effect of $`X` on $`Y` satisfies:

1. **Relevance**: $`Z` is associated with $`X` (i.e., $`P(X \mid Z = z_1) \neq P(X \mid Z = z_2)` for some $`z_1 \neq z_2`).
2. **Exclusion**: $`Z` affects $`Y` only through $`X` (no direct effect).
3. **Independence**: $`Z` is independent of unobserved confounders of $`X` and $`Y`.

<svg width="320" height="140" viewBox="0 0 320 140" xmlns="http://www.w3.org/2000/svg" style="display:block;margin:1em auto;">
  <defs><marker id="ah3" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#333"/></marker></defs>
  <!-- Z node (instrument) -->
  <circle cx="40" cy="30" r="18" fill="#d4a5e5" stroke="#333" stroke-width="1.5"/>
  <text x="40" y="35" text-anchor="middle" font-size="12" font-weight="bold" fill="#333">Z</text>
  <!-- U node (unobserved confounder) -->
  <circle cx="160" cy="30" r="18" fill="#f9d71d" stroke="#333" stroke-width="1.5"/>
  <text x="160" y="35" text-anchor="middle" font-size="12" font-weight="bold" fill="#333">U</text>
  <!-- X node -->
  <circle cx="100" cy="110" r="18" fill="#a8d8ea" stroke="#333" stroke-width="1.5"/>
  <text x="100" y="115" text-anchor="middle" font-size="13" font-weight="bold" fill="#333">X</text>
  <!-- Y node -->
  <circle cx="260" cy="110" r="18" fill="#f4a261" stroke="#333" stroke-width="1.5"/>
  <text x="260" y="115" text-anchor="middle" font-size="13" font-weight="bold" fill="#333">Y</text>
  <!-- Edges -->
  <line x1="52" y1="45" x2="90" y2="95" stroke="#333" stroke-width="1.5" marker-end="url(#ah3)"/>
  <line x1="145" y1="42" x2="110" y2="95" stroke="#333" stroke-width="1.5" marker-end="url(#ah3)"/>
  <line x1="175" y1="42" x2="250" y2="95" stroke="#333" stroke-width="1.5" marker-end="url(#ah3)"/>
  <line x1="118" y1="110" x2="242" y2="110" stroke="#333" stroke-width="1.5" marker-end="url(#ah3)"/>
  <!-- No Z→Y edge label -->
  <text x="160" y="135" text-anchor="middle" font-size="10" fill="#666">No Z → Y edge (exclusion restriction)</text>
</svg>

<details><summary>Details</summary>

When a valid instrument exists, the causal effect can be estimated by the **Wald estimator** (ratio of two differences):

```math
\text{Causal effect} = \frac{\text{Cov}(Z, Y)}{\text{Cov}(Z, X)} = \frac{E[Y \mid Z = 1] - E[Y \mid Z = 0]}{E[X \mid Z = 1] - E[X \mid Z = 0]}
```

**Example.** In a drug trial, suppose a doctor's prescribing habit (a binary variable) affects whether a patient receives the drug, but the habit itself does not affect recovery except through the drug. The doctor's habit is an instrument. The Wald estimator gives the causal effect of the drug on recovery, even though unobserved patient severity confounds the drug–recovery association.

The IV structure ($`Z \to X \to Y` with no $`Z \to Y` edge and no confounding on $`Z`) is a distinct graphical pattern from the front-door criterion ($`X \to M \to Y` with an unconfounded mediator). Both are identifiable via the do-calculus, but they correspond to different graphical configurations and different identifying formulas. Note that the Wald estimator identifies the **local average treatment effect** (LATE): the effect for the *compliers* whose treatment was actually changed by the instrument, not for the whole population.

</details>

## Counterfactuals

A **counterfactual** asks: what would have happened to this specific unit under a different intervention? Formally, for a unit with observed $`(X = x, Y = y)`, the counterfactual is

```math
Y_{x'} \quad \text{(the outcome this unit would have had if } X = x' \text{ instead)}
```

This is the top rung of the [ladder of causation](#the-ladder-of-causation): it combines observation (the evidence $`X = x, Y = y`) with intervention (setting $`X` to $`x'`).

<details><summary>Details</summary>

Counterfactuals are the most specific level of causal reasoning. They require the full SCM, not just the graph: two SCMs with the same graph can induce different counterfactuals.

**Example.** A patient took a drug ($`X = 1`) and recovered ($`Y = 1`). The counterfactual question is: would this patient have recovered *without* the drug ($`Y_{x=0} = ?`)? The answer requires the structural equations and the unit's exogenous variables.

Counterfactuals are computed from the SCM by **abduction–action–prediction**:

1. *Abduction*: use the evidence $`(X = x, Y = y)` to infer the posterior over the exogenous variables $`U` for this unit.
2. *Action*: modify the SCM, replacing the equation for $`X` by $`X = x'`.
3. *Prediction*: propagate the inferred $`U` through the modified equations to obtain $`Y_{x'}`.

The resulting quantity $`P(Y_{x'} \mid X = x, Y = y)` mixes levels: it conditions on observations (rung 1) but answers a counterfactual question (rung 3). This is why it cannot in general be written as a function of $`P(V)` alone — the structural equations, not just the graph, are needed.

</details>

## Practical estimation methods

When the identifying assumptions hold, several methods estimate causal effects from observational data. Each is the applied counterpart of one theoretical identification result:

<table>
<tr><th>Method</th><th>Theoretical counterpart</th><th>Key identifying assumption</th><th>Estimator</th></tr>
<tr><td><a href="https://en.wikipedia.org/wiki/Propensity_score_matching">Propensity score methods</a></td><td>Back-door criterion / conditional unconfoundedness</td><td>(Y(0), Y(1)) ⊥⊥ X | Z, SUTVA</td><td>Weight or match on e(Z) = P(X = 1 | Z = z)</td></tr>
<tr><td><a href="https://en.wikipedia.org/wiki/Difference_in_differences">Difference-in-differences</a></td><td>Potential outcomes with time-varying treatment</td><td>Parallel trends</td><td>Double difference of means over time and group</td></tr>
<tr><td><a href="https://en.wikipedia.org/wiki/Regression_discontinuity_design">Regression discontinuity</a></td><td>Local randomization at a cutoff</td><td>Continuity of potential-outcome functions at the cutoff</td><td>Discontinuity of E[Y | X] at the cutoff</td></tr>
<tr><td><a href="https://en.wikipedia.org/wiki/Instrumental_variable_estimation">Instrumental variables</a></td><td>IV graph (Z → X → Y, no Z → Y)</td><td>Relevance, exclusion, independence</td><td>Wald estimator / 2SLS</td></tr>
</table>

- **Propensity score methods**: estimate the propensity score $`e(Z) = P(X = 1 \mid Z)` and use it to balance the sample (matching, weighting, or subclassification). The score is a *balancing score*: given it, treatment is independent of the covariates, so adjusting for the one-dimensional $`e(Z)` suffices to adjust for the whole $`Z`.
- **Difference-in-differences**: with a treated and a control group observed before and after treatment, the estimator is

```math
\hat{\tau}_{\text{DiD}} = \big(\bar{Y}_{\text{treated, after}} - \bar{Y}_{\text{treated, before}}\big) - \big(\bar{Y}_{\text{control, after}} - \bar{Y}_{\text{control, before}}\big)
```

  valid when, absent treatment, both groups would have followed *parallel trends*.
- **Regression discontinuity**: when treatment is assigned by a threshold rule $`X = \mathbf{1}[S \geq c]` on a running variable $`S`, units near the cutoff are comparable, and

```math
\tau_{\text{RD}} = \lim_{s \downarrow c} E[Y \mid S = s] - \lim_{s \uparrow c} E[Y \mid S = s]
```

  identifies the local effect at the cutoff: manipulation of $`S` near $`c` aside, assignment is *as if* randomized in a narrow window.

<details><summary>Details</summary>

**Why the propensity score suffices.** By Rosenbaum and Rubin (1983), $`e(Z)` is a balancing score: $`X \perp\!\!\!\perp Z \mid e(Z)`. Hence, under conditional unconfoundedness $`(Y(0), Y(1)) \perp\!\!\!\perp X \mid Z`, adjusting for the scalar $`e(Z)` removes all confounding — this is the back-door adjustment with the score replacing the full covariate vector. In practice one estimates $`e(Z)` (e.g., by logistic regression) and either matches treated to control units with similar scores, or weights units by $`1/e(Z)` (treated) and $`1/(1 - e(Z))` (controls) to build a pseudo-population with no confounding.

**Why parallel trends is a causal assumption.** The DiD estimator cancels the pre/post trend common to both groups. It is identified only if the *counterfactual* trend of the treated group equals the observed trend of the control group — an untestable claim about rung 2 of the ladder, not a statistical association. It is the time-varying analogue of unconfoundedness: time-invariant unobserved confounders are allowed, but their effect must evolve identically in both groups.

**Why RD is "local randomization".** Units cannot precisely manipulate the running variable at the cutoff, so just above and just below $`c` the populations are comparable in expectation: the discontinuity in $`E[Y \mid S = s]` at $`c` is the causal effect *at the cutoff* (a local average treatment effect). The price is external validity: the estimate says nothing about units far from $`c`.

Each method also requires SUTVA (see [SUTVA](#sutva)) and correct functional-form assumptions; violations of any of these produce biased estimates even when the underlying identification argument is valid.

</details>

## Causal discovery

Throughout this page, the DAG $`G` is assumed *known* (from domain knowledge). **Causal discovery** is the subfield that instead tries to learn the structure of $`G` from observational data. In general, the observational distribution only identifies $`G` up to its **Markov equivalence class** (the set of DAGs entailing the same conditional independencies), so additional assumptions are needed: e.g., the PC and GES algorithms work under faithfulness (all conditional independencies in the distribution come from the graph), while LiNGAM identifies the full DAG by assuming linear relations with non-Gaussian noise. Discovery is an active research area; the practical workflow is usually to use discovery to generate candidate graphs, then to validate and refine them with domain knowledge before applying the identification results above.

## Causal inference and machine learning

Modern machine learning enters causal inference on both ends: as a *flexible estimator* for the nuisance functions that identification results leave free (the propensity score $`e(Z)`, the outcome regressions $`E[Y \mid X, Z]`), and as a *consumer* of causal reasoning (predictive models trained on observational data answer rung-1 questions and break under interventions or distribution shift).

<details><summary>Details</summary>

Key causal ML methods:

- **Double/debiased machine learning (DML)**: use any ML method to fit the nuisance functions $`e(Z)` and $`m(Z) = E[Y \mid Z]`, then average the residuals:

```math
\hat{\tau}_{\text{DML}} = \frac{\sum_i \big(Y_i - m(Z_i)\big)\big(X_i - e(Z_i)\big)}{\sum_i \big(X_i - e(Z_i)\big)^2}
```

  Cross-fitting (fitting the nuisances on one fold, evaluating on another) plus the Neyman orthogonality of the score make the estimator root-n consistent even when the nuisances are learned at slower rates. This is the potential-outcomes/back-door machinery with ML plug-ins.
- **Causal forests** (Wager & Athey): random forests modified so that estimates of the *conditional* average treatment effect $`\tau(z) = E[Y(1) - Y(0) \mid Z = z]` are asymptotically normal and honest (estimation and splitting use separate samples).
- **Meta-learners** for heterogeneous effects with binary treatment: the **S-learner** fits one model $`E[Y \mid X, Z]` and reads off $`\hat{\tau}(z)` as the difference of predictions at $`X = 1` and $`X = 0`; the **T-learner** fits separate models per arm and takes their difference; the **X-learner** imputes each unit's missing potential outcome, models the imputed effects per arm, and combines them weighted by the propensity score — often best when one arm is much larger than the other.

All of these assume an identification result already holds (typically conditional unconfoundedness given $`Z`, i.e., the back-door criterion); the machine learning only makes the *estimation* flexible, not the *identification*.

</details>

## Example problem

**Problem.** In a city, ice cream sales ($`X`) and drowning deaths ($`Y`) are positively correlated. A third variable, temperature ($`T`), causes both: $`T \to X`, $`T \to Y`. (a) Is the associational correlation between $`X` and $`Y` a causal effect? (b) Using the back-door criterion, show that conditioning on $`T` identifies the causal effect of $`X` on $`Y`. (c) What is the causal effect if the structural equations are $`X = T + U_X` and $`Y = 0.5\,T + U_Y` (with $`U_X, U_Y` independent of $`T`)?

<details><summary>Solution</summary>

**(a)** No. The correlation between $`X` and $`Y` is spurious: both are caused by $`T`. There is no causal path from $`X` to $`Y` in the graph $`T \to X`, $`T \to Y`. The causal effect of $`X` on $`Y` is zero.

**(b)** The back-door paths from $`X` to $`Y` are: $`X \leftarrow T \to Y`. The set $`Z = \{T\}` blocks this path (it is a common cause, not a descendant of $`X`). By the back-door criterion:

```math
P(Y \mid \text{do}(X = x)) = \sum_t P(Y \mid X = x, T = t)\, P(T = t)
```

Since $`Y \perp\!\!\!\perp X \mid T` (no direct edge $`X \to Y`), this simplifies to $`P(Y \mid T = t)` integrated over $`T`, which does not depend on $`x`. Hence the causal effect is zero.

**(c)** From the structural equations, $`Y = 0.5\,T + U_Y` does not contain $`X`. Setting $`X = x` (do-operator) changes the equation for $`X` but not for $`Y`. Therefore $`E[Y \mid \text{do}(X = x)] = E[0.5\,T + U_Y] = 0.5\,E[T]` regardless of $`x`. The causal effect is $`0.5\,E[T] - 0.5\,E[T] = 0`, confirming part (a).

</details>

<details><summary>Quiz</summary>

**Question 1.** In the graph $`Z \to X \to Y` with an additional edge $`Z \to Y`, is $`Z` a valid instrument for the effect of $`X` on $`Y`? Which assumption fails?

**Question 2.** A study measures the effect of a minimum-wage increase by comparing employment just above and just below the wage threshold. Which estimation method is this, and what is its key identifying assumption?

**Question 3.** At which rung of the ladder of causation is the quantity $`P(Y_{x'} \mid X = x, Y = y)`? Why can it not be computed from the observational distribution alone, even with the DAG known?

</details>

<details><summary>How to solve</summary>

**Question 1.** No. The exclusion restriction fails: $`Z` has a direct edge to $`Y`, so $`Z` affects $`Y` through paths other than $`X`. The Wald estimator would then mix the direct effect of $`Z` into the estimated effect of $`X`. In the IV graph, $`Z` must affect $`Y` only through $`X`.

**Question 2.** Regression discontinuity. Treatment is assigned by a threshold rule on a running variable (wage level relative to the threshold). The key assumption is continuity of the potential-outcome functions at the cutoff — equivalently, that units just above and below the threshold are comparable (local randomization), so the discontinuity in $`E[Y \mid S = s]` at the cutoff identifies the local causal effect.

**Question 3.** Rung 3 (counterfactuals). It conditions on observed evidence ($`X = x, Y = y`) and asks about a different intervention ($`x'`). The observational distribution $`P(V)` is a rung-1 object: many different SCMs — with the same DAG and the same $`P(V)` but different structural equations — induce different values of $`P(Y_{x'} \mid X = x, Y = y)`. Computing it requires the full structural equations (via abduction–action–prediction), not just the graph.

</details>

<iframe src="./Causal-inference.simulation.html" title="Interactive DAG: toggle interventions and observe distribution changes"></iframe>


Causal inference is the task of determining the effect of an intervention or treatment on an outcome. Unlike associational inference (estimation, regression), it asks: what would happen if we *did* something? It targets interventional and counterfactual quantities that are not identifiable from observational data alone without additional assumptions. It is central to clinical trials, policy evaluation, and machine learning.

> **Authoritative sources**
> - [J. Pearl, Causality: Models, Reasoning, and Inference (2009)](https://doi.org/10.1017/CBO9780511803161)
> - [J. Pearl & D. Mackenzie, The Book of Why: The New Science of Cause and Effect (2018)](https://www.wiley.com/en-us/The+Book+of+Why%3A+The+New+Science+of+Cause+and+Effect-p-9781119186847)
> - [M. A. Hernán & J. M. Robins, Causal Inference: What If (2020)](https://www.hbs.edu/faculty/Pages/profile.aspx?facId=653588)

## Structural causal models

A **structural causal model** (SCM) is a directed acyclic graph (DAG) $`G = (V, E)` with a structural equation for each node:

```math
X_i = f_i(\text{Pa}(X_i), U_i)
```

where $`\text{Pa}(X_i)` are the parents of $`X_i` in the graph and $`U_i` are exogenous (unobserved) noise variables.

<svg width="280" height="140" viewBox="0 0 280 140" xmlns="http://www.w3.org/2000/svg" style="display:block;margin:1em auto;">
  <defs><marker id="ah1" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#333"/></marker></defs>
  <!-- U node (confounder) -->
  <circle cx="140" cy="30" r="20" fill="#f9d71d" stroke="#333" stroke-width="1.5"/>
  <text x="140" y="35" text-anchor="middle" font-size="13" font-weight="bold" fill="#333">U</text>
  <!-- X node -->
  <circle cx="50" cy="110" r="20" fill="#a8d8ea" stroke="#333" stroke-width="1.5"/>
  <text x="50" y="115" text-anchor="middle" font-size="13" font-weight="bold" fill="#333">X</text>
  <!-- Y node -->
  <circle cx="230" cy="110" r="20" fill="#f4a261" stroke="#333" stroke-width="1.5"/>
  <text x="230" y="115" text-anchor="middle" font-size="13" font-weight="bold" fill="#333">Y</text>
  <!-- Edges -->
  <line x1="125" y1="45" x2="62" y2="95" stroke="#333" stroke-width="1.5" marker-end="url(#ah1)"/>
  <line x1="155" y1="45" x2="218" y2="95" stroke="#333" stroke-width="1.5" marker-end="url(#ah1)"/>
  <!-- Labels -->
  <text x="80" y="70" font-size="11" fill="#666">confounds</text>
  <text x="175" y="70" font-size="11" fill="#666">confounds</text>
</svg>

<details><summary>Details</summary>

The DAG encodes causal assumptions: an edge $`X \to Y` means $`X` is a direct cause of $`Y`. The model generates a joint distribution $`P(X_1, \ldots, X_n)` that is *Markov* with respect to the graph: each variable is independent of its non-descendants given its parents.

**Example.** A simple SCM for a drug trial:

```math
\text{Drug} \to \text{Recovery}, \quad \text{Age} \to \text{Recovery}, \quad \text{Age} \to \text{Drug}
```

Here, Age is a **confounder**: it affects both the treatment assignment and the outcome. The associational effect of Drug on Recovery is confounded by Age.

The SCM framework makes explicit the distinction between *associational* quantities (read off the observed distribution) and *interventional* quantities (require modifying the model). This is the key insight that separates causal inference from [Estimation](./Estimation.md) and [Hypothesis testing](./Hypothesis-testing.md).

</details>

## The do-operator

The **do-operator** $`\text{do}(X = x)` represents an intervention: setting $`X` to $`x` by external force, breaking its incoming edges. The interventional distribution is

```math
P(Y \mid \text{do}(X = x))
```

<details><summary>Details</summary>

The do-operator modifies the SCM: the structural equation for $`X` is replaced by $`X = x` (a constant), and all incoming edges to $`X` are removed. The resulting distribution is the **interventional distribution**.

Key distinction:
- $`P(Y \mid X = x)` (associational): the distribution of $`Y` among units that *happen to have* $`X = x`.
- $`P(Y \mid \text{do}(X = x))` (interventional): the distribution of $`Y` if we *force* $`X = x`.

These are equal if and only if there is no confounding (i.e., $`X` is independent of the potential outcomes). In general, $`P(Y \mid X = x) \neq P(Y \mid \text{do}(X = x))`.

**Example.** In the drug trial SCM, $`P(\text{Recovery} \mid \text{Drug} = 1)` is confounded by Age (older patients are more likely to receive the drug and less likely to recover). But $`P(\text{Recovery} \mid \text{do}(\text{Drug} = 1))` gives the true causal effect, free of confounding.

</details>

## Identifiability and do-calculus

An interventional quantity $`P(Y \mid \text{do}(X))` is **identifiable** if it can be expressed as a function of the observed (associational) distribution $`P(V)`. Pearl's **do-calculus** provides three rules for transforming interventional queries into associational ones:

1. **Insertion/deletion of observation**: if $`Z` is independent of $`X` in the graph with all incoming edges to $`X` removed, then $`P(y \mid \text{do}(x), z) = P(y \mid \text{do}(x))`.
2. **Action/observation exchange**: if $`Z` is independent of $`X` in the graph with incoming edges to $`X` removed and $`Z` set to a constant, then $`P(y \mid \text{do}(x), z) = P(y \mid x, \text{do}(z'))`.
3. **Insertion/deletion of action**: if $`Z` is independent of $`X` in the graph with all incoming edges to both $`X` and $`Z` removed, then $`P(y \mid \text{do}(x), \text{do}(z)) = P(y \mid \text{do}(z))`.

The key graphical criterion is the **back-door criterion**: a set $`Z` satisfies the back-door criterion relative to $`(X, Y)` if it blocks all back-door paths from $`X` to $`Y` and contains no descendants of $`X`. Then

```math
P(Y \mid \text{do}(X = x)) = \sum_z P(Y \mid X = x, Z = z)\, P(Z = z)
```

<details><summary>Details</summary>

The do-calculus is a complete decision procedure: if an interventional quantity is identifiable, the do-calculus can derive its expression in terms of observed quantities.

- **Front-door criterion**: if there is a confounded path $`X \to Y` but a mediator $`M` such that $`X \to M \to Y` is unconfounded, then the causal effect is identifiable via the front-door formula:

```math
P(Y \mid \text{do}(X = x)) = \sum_m P(M = m \mid X = x) \sum_{x'} P(Y \mid M = m, X = x')\, P(X = x')
```

<svg width="320" height="140" viewBox="0 0 320 140" xmlns="http://www.w3.org/2000/svg" style="display:block;margin:1em auto;">
  <defs><marker id="ah2" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#333"/></marker></defs>
  <!-- U node -->
  <circle cx="160" cy="25" r="18" fill="#f9d71d" stroke="#333" stroke-width="1.5"/>
  <text x="160" y="30" text-anchor="middle" font-size="12" font-weight="bold" fill="#333">U</text>
  <!-- X node -->
  <circle cx="40" cy="100" r="18" fill="#a8d8ea" stroke="#333" stroke-width="1.5"/>
  <text x="40" y="105" text-anchor="middle" font-size="12" font-weight="bold" fill="#333">X</text>
  <!-- M node -->
  <circle cx="160" cy="100" r="18" fill="#b5e8b5" stroke="#333" stroke-width="1.5"/>
  <text x="160" y="105" text-anchor="middle" font-size="12" font-weight="bold" fill="#333">M</text>
  <!-- Y node -->
  <circle cx="280" cy="100" r="18" fill="#f4a261" stroke="#333" stroke-width="1.5"/>
  <text x="280" y="105" text-anchor="middle" font-size="12" font-weight="bold" fill="#333">Y</text>
  <!-- Edges -->
  <line x1="145" y1="38" x2="52" y2="87" stroke="#333" stroke-width="1.5" marker-end="url(#ah2)"/>
  <line x1="175" y1="38" x2="268" y2="87" stroke="#333" stroke-width="1.5" marker-end="url(#ah2)"/>
  <line x1="58" y1="100" x2="142" y2="100" stroke="#333" stroke-width="1.5" marker-end="url(#ah2)"/>
  <line x1="178" y1="100" x2="262" y2="100" stroke="#333" stroke-width="1.5" marker-end="url(#ah2)"/>
  <!-- Dashed edge X→Y (confounded direct) -->
  <line x1="58" y1="112" x2="262" y2="112" stroke="#c0392b" stroke-width="1.2" stroke-dasharray="5,3" marker-end="url(#ah2)"/>
  <text x="160" y="130" text-anchor="middle" font-size="10" fill="#c0392b">confounded direct path</text>
</svg>

The back-door criterion is the most commonly used: it says that conditioning on the right set of covariates (confounders) removes confounding bias.

</details>

## Potential outcomes framework

The **potential outcomes** (Rubin) framework represents causality at the level of individual units. For a binary treatment $`X \in \{0, 1\}` and outcome $`Y`, each unit $`i` has two potential outcomes:

```math
Y_i(1) \quad \text{(outcome if treated)}, \qquad Y_i(0) \quad \text{(outcome if untreated)}
```

The **individual causal effect** is $`Y_i(1) - Y_i(0)`, but only one of the two is ever observed (the **fundamental problem of causal inference**). The **average treatment effect** (ATE) is

```math
\text{ATE} = E[Y(1) - Y(0)] = E[Y(1)] - E[Y(0)]
```

<details><summary>Details</summary>

The two main frameworks for causal inference are:

<table>
<tr><th>Framework</th><th>Key objects</th><th>Identifiability condition</th></tr>
<tr><td>Structural (Pearl)</td><td>DAG + structural equations</td><td>do-calculus / back-door / front-door</td></tr>
<tr><td>Potential outcomes (Rubin)</td><td>Y<sub>i</sub>(0), Y<sub>i</sub>(1) per unit</td><td>Unconfoundedness / ignorability</td></tr>
</table>

In the potential outcomes framework, the key assumption is **unconfoundedness** (also called ignorability or selection on observables):

```math
(Y(0), Y(1)) \perp\!\!\!\perp X
```

i.e., potential outcomes are independent of treatment assignment. This is equivalent to the back-door criterion in the SCM framework when the DAG has a single confounder.

The two frameworks are mathematically equivalent: any SCM induces a set of potential outcomes, and any set of potential outcomes satisfying consistency and unconfoundedness can be represented by an SCM.

**Connection to the do-operator.** In the potential outcomes framework, $`E[Y \mid \text{do}(X = 1)] = E[Y(1)]` and $`E[Y \mid \text{do}(X = 0)] = E[Y(0)]`. The ATE is the difference of interventional means.

</details>

## Instrumental variables

An **instrumental variable** $`Z` for the effect of $`X` on $`Y` satisfies:

1. **Relevance**: $`Z` is associated with $`X` (i.e., $`P(X \mid Z = z_1) \neq P(X \mid Z = z_2)` for some $`z_1 \neq z_2`).
2. **Exclusion**: $`Z` affects $`Y` only through $`X` (no direct effect).
3. **Independence**: $`Z` is independent of unobserved confounders of $`X` and $`Y`.

<svg width="320" height="140" viewBox="0 0 320 140" xmlns="http://www.w3.org/2000/svg" style="display:block;margin:1em auto;">
  <defs><marker id="ah3" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#333"/></marker></defs>
  <!-- Z node (instrument) -->
  <circle cx="40" cy="30" r="18" fill="#d4a5e5" stroke="#333" stroke-width="1.5"/>
  <text x="40" y="35" text-anchor="middle" font-size="12" font-weight="bold" fill="#333">Z</text>
  <!-- U node (unobserved confounder) -->
  <circle cx="160" cy="30" r="18" fill="#f9d71d" stroke="#333" stroke-width="1.5"/>
  <text x="160" y="35" text-anchor="middle" font-size="12" font-weight="bold" fill="#333">U</text>
  <!-- X node -->
  <circle cx="100" cy="110" r="18" fill="#a8d8ea" stroke="#333" stroke-width="1.5"/>
  <text x="100" y="115" text-anchor="middle" font-size="12" font-weight="bold" fill="#333">X</text>
  <!-- Y node -->
  <circle cx="260" cy="110" r="18" fill="#f4a261" stroke="#333" stroke-width="1.5"/>
  <text x="260" y="115" text-anchor="middle" font-size="12" font-weight="bold" fill="#333">Y</text>
  <!-- Edges -->
  <line x1="52" y1="45" x2="90" y2="95" stroke="#333" stroke-width="1.5" marker-end="url(#ah3)"/>
  <line x1="145" y1="42" x2="110" y2="95" stroke="#333" stroke-width="1.5" marker-end="url(#ah3)"/>
  <line x1="175" y1="42" x2="250" y2="95" stroke="#333" stroke-width="1.5" marker-end="url(#ah3)"/>
  <line x1="118" y1="110" x2="242" y2="110" stroke="#333" stroke-width="1.5" marker-end="url(#ah3)"/>
  <!-- No Z→Y edge label -->
  <text x="160" y="135" text-anchor="middle" font-size="10" fill="#666">No Z → Y edge (exclusion restriction)</text>
</svg>

<details><summary>Details</summary>

When a valid instrument exists, the causal effect can be estimated by the **Wald estimator** (ratio of two differences):

```math
\text{Causal effect} = \frac{\text{Cov}(Z, Y)}{\text{Cov}(Z, X)} = \frac{E[Y \mid Z = 1] - E[Y \mid Z = 0]}{E[X \mid Z = 1] - E[X \mid Z = 0]}
```

**Example.** In a drug trial, suppose a doctor's prescribing habit (a binary variable) affects whether a patient receives the drug, but the habit itself does not affect recovery except through the drug. The doctor's habit is an instrument. The Wald estimator gives the causal effect of the drug on recovery, even though unobserved patient severity confounds the drug–recovery association.

The IV structure ($`Z \to X \to Y` with no $`Z \to Y` edge and no confounding on $`Z`) is a distinct graphical pattern from the front-door criterion ($`X \to M \to Y` with an unconfounded mediator). Both are identifiable via the do-calculus, but they correspond to different graphical configurations and different identifying formulas.

</details>

## Counterfactuals

A **counterfactual** asks: what would have happened to this specific unit under a different intervention? Formally, for a unit with observed $`(X = x, Y = y)`, the counterfactual is

```math
Y_{x'} \quad \text{(the outcome this unit would have had if } X = x' \text{ instead)}
```

<details><summary>Details</summary>

Counterfactuals are the most specific level of causal reasoning (Pearl's "ladder of causation": association → intervention → counterfactual). They require the full SCM, not just the graph.

**Example.** A patient took a drug ($`X = 1`) and recovered ($`Y = 1`). The counterfactual question is: would this patient have recovered *without* the drug ($`Y_{x=0} = ?`)? The answer requires the structural equations and the unit's exogenous variables.

Counterfactuals are identifiable from the SCM: $`P(Y_{x'} \mid X = x, Y = y)` can be computed by "abduction–action–prediction" (infer the exogenous variables from the evidence, apply the intervention, predict the outcome).

</details>

## Practical estimation methods

When the identifying assumptions hold, several methods estimate causal effects from observational data:

- **Propensity score matching**: estimate $`P(X = 1 \mid Z)` (the propensity score), match treated and control units with similar scores, and compare outcomes.
- **Difference-in-differences**: compare the change in outcomes over time between a treated group and a control group, assuming parallel trends.
- **Regression discontinuity**: exploit a known threshold (cutoff) that determines treatment assignment; compare outcomes just above and below the cutoff.

<details><summary>Details</summary>

These methods are the applied counterparts of the theoretical frameworks above:

- **Propensity score matching** operationalizes the back-door criterion: the propensity score $`e(Z) = P(X = 1 \mid Z)` is a balancing score that, when conditioned on, makes treatment independent of the covariates.
- **Difference-in-differences** is a special case of the potential outcomes framework with a time-varying treatment: the "parallel trends" assumption is a dynamic version of unconfoundedness.
- **Regression discontinuity** exploits a local randomization: near the cutoff, treatment assignment is approximately random, so the local average treatment effect is identified without further assumptions.

Each method requires its own set of assumptions (no interference, SUTVA, correct functional form, etc.) that go beyond the basic causal model.

</details>

## Example problem

**Problem.** In a city, ice cream sales ($`X`) and drowning deaths ($`Y`) are positively correlated. A third variable, temperature ($`T`), causes both: $`T \to X`, $`T \to Y`. (a) Is the associational correlation between $`X` and $`Y` a causal effect? (b) Using the back-door criterion, show that conditioning on $`T` identifies the causal effect of $`X` on $`Y`. (c) What is the causal effect if the structural equations are $`X = T + U_X` and $`Y = 0.5\,T + U_Y` (with $`U_X, U_Y` independent of $`T`)?

<details><summary>Solution</summary>

**(a)** No. The correlation between $`X` and $`Y` is spurious: both are caused by $`T`. There is no causal path from $`X` to $`Y` in the graph $`T \to X`, $`T \to Y`. The causal effect of $`X` on $`Y` is zero.

**(b)** The back-door paths from $`X` to $`Y` are: $`X \leftarrow T \to Y`. The set $`Z = \{T\}` blocks this path (it is a common cause, not a descendant of $`X`). By the back-door criterion:

```math
P(Y \mid \text{do}(X = x)) = \sum_t P(Y \mid X = x, T = t)\, P(T = t)
```

Since $`Y \perp\!\!\!\perp X \mid T` (no direct edge $`X \to Y`), this simplifies to $`P(Y \mid T = t)` integrated over $`T`, which does not depend on $`x`. Hence the causal effect is zero.

**(c)** From the structural equations, $`Y = 0.5\,T + U_Y` does not contain $`X`. Setting $`X = x` (do-operator) changes the equation for $`X` but not for $`Y`. Therefore $`E[Y \mid \text{do}(X = x)] = E[0.5\,T + U_Y] = 0.5\,E[T]` regardless of $`x`. The causal effect is $`0.5\,E[T] - 0.5\,E[T] = 0`, confirming part (a).

</details>

<iframe src="./Causal-inference.simulation.html" title="Interactive DAG: toggle interventions and observe distribution changes"></iframe>
