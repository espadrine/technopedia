# Distributional structure and operations

This topic studies the algebraic and structural relationships between distributions: the fundamental operations that generate new distributions from old ones (convolution, mixture, transformation), the parametric families defined by their closure under those operations (exponential, location-scale, stable), and order statistics. It provides the unifying framework that explains why certain distributions recur across applications and how new distributions can be generated from old ones.

> **Authoritative sources**
> - [B. Efron, Exponential Families in Theory and Practice (Cambridge University Press)](https://www.cambridge.org/core/books/exponential-families-in-theory-and-practice/45CE4C98DEAB5EC9D6934E9DAC002F5F)
> - [R. D. Durrett, Probability: Theory and Examples (5th ed.)](https://sites.math.duke.edu/~rtd/PTE/pte.html)

The operations come first because the families are *defined* by how they behave under them. We build the page in that order: the two basic operations (convolution, mixture), how they interact, then the three families that are characterized by their closure properties, and finally order statistics.

## Convolution

The **convolution** of two distributions $`\mu` and $`\nu` is the distribution of $`X + Y` where $`X \sim \mu` and $`Y \sim \nu` independently:

```math
(\mu * \nu)(A) = \int \mu(A - y)\, \nu(dy).
```

- For densities: $`(f * g)(x) = \int f(x - y)\, g(y)\, dy`.
- For PMFs: $`(p * q)(k) = \sum_j p(j)\, q(k - j)`.
- For PGFs: $`G_{X+Y}(z) = G_X(z) \cdot G_Y(z)`.
- For characteristic functions: $`\varphi_{X+Y}(t) = \varphi_X(t) \cdot \varphi_Y(t)`.

Convolution is associative and commutative. The delta measure $`\delta_0` is the identity. The relationship to [Atomic distributions](./Atomic-distributions.md): the PGF converts convolution to multiplication, making it the algebraic tool for discrete sums.

<details><summary>Details</summary>

Convolution is the distributional analogue of multiplication in the algebra of functions: it is the operation that answers "what is the law of a sum of independent quantities?" The defining integral has a concrete geometric reading — **slide one density past the other, multiply pointwise, and integrate** — which is the single idea behind every closure result below.

**The sliding picture.** Fix $`x`. The integrand $`f(x-y)\,g(y)` is the product of $`g` at $`y` and $`f` *reflected and shifted* to be centered at $`x`. As $`x` increases, that reflected copy of $`f` slides to the right, and the area under the product traces out the density of the sum.

<svg viewBox="0 0 600 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Convolution as sliding and multiplying two densities">
  <line x1="30" y1="200" x2="570" y2="200" stroke="#333" stroke-width="1.5"/>
  <polygon points="570,200 562,196 562,204" fill="#333"/>
  <!-- g(y): a bump centered at 150 -->
  <path d="M60 200 Q150 60 240 200" fill="none" stroke="#2b6cb0" stroke-width="2.5"/>
  <text x="150" y="55" text-anchor="middle" fill="#2b6cb0" font-size="14">g(y)</text>
  <!-- f(x-y): reflected bump centered at x=400 -->
  <path d="M310 200 Q400 90 490 200" fill="none" stroke="#c53030" stroke-width="2.5" stroke-dasharray="6 4"/>
  <text x="400" y="85" text-anchor="middle" fill="#c53030" font-size="14">f(x − y)</text>
  <!-- product shading between the two bumps -->
  <path d="M240 200 Q300 150 310 200 Z" fill="#f6ad55" opacity="0.55"/>
  <text x="275" y="185" text-anchor="middle" fill="#9c4221" font-size="12">product</text>
  <!-- marker for x -->
  <line x1="400" y1="200" x2="400" y2="215" stroke="#c53030" stroke-width="1.5"/>
  <text x="400" y="230" text-anchor="middle" fill="#c53030" font-size="13">x</text>
  <text x="300" y="225" text-anchor="middle" fill="#333" font-size="13">(f * g)(x) = ∫ f(x − y) g(y) dy</text>
</svg>

**Worked example (discrete).** Let $`X \sim \mathrm{Poisson}(\lambda_1)` and $`Y \sim \mathrm{Poisson}(\lambda_2)` be independent. The PMF of the sum is

```math
P(X+Y=k) = \sum_{j=0}^{k} \frac{e^{-\lambda_1}\lambda_1^j}{j!}\,\frac{e^{-\lambda_2}\lambda_2^{k-j}}{(k-j)!}
= e^{-(\lambda_1+\lambda_2)} \frac{1}{k!}\sum_{j=0}^{k}\binom{k}{j}\lambda_1^j \lambda_2^{k-j}
= \frac{e^{-(\lambda_1+\lambda_2)}(\lambda_1+\lambda_2)^k}{k!}.
```

The inner sum is the binomial expansion, so $`X+Y \sim \mathrm{Poisson}(\lambda_1+\lambda_2)`. Equivalently, in one line via PGFs: $`G_{X+Y}(z)=e^{\lambda_1(z-1)}e^{\lambda_2(z-1)}=e^{(\lambda_1+\lambda_2)(z-1)}`.

**Closure results.** Convolution is the operation that the families below are closed under:

- The sum of independent normals is normal (closure of the normal family).
- The sum of independent gammas with the same rate is gamma (closure of the gamma family).
- The sum of independent Poissons is Poisson (closure of the Poisson family).
- The sum of independent stable($`\alpha, \beta`) variables is stable($`\alpha, \beta'`) (closure of the stable family).

Note that closure is a property of *specific* families, not of the exponential family as a whole: the sum of i.i.d. $`\mathrm{Exp}(\lambda)` is $`\mathrm{Gamma}(n,\lambda)`, not exponential, and the sum of i.i.d. $`\mathrm{Bernoulli}(p)` is $`\mathrm{Binomial}(n,p)`, not Bernoulli.

The **irreducibility** of convolution: if $`\mu * \nu = \delta_0`, then $`\mu = \nu = \delta_0`. This means convolution has no nontrivial inverses, unlike multiplication of functions.

> **Authoritative sources**
> - [R. D. Durrett, Probability: Theory and Examples (5th ed.)](https://sites.math.duke.edu/~rtd/PTE/pte.html)

<details><summary>Example problem</summary>

**Problem.** If $`X \sim \mathrm{Poisson}(3)` and $`Y \sim \mathrm{Poisson}(5)` are independent, find the distribution of $`X+Y` and of $`X-Y`.

<details><summary>Solution</summary>

$`X+Y \sim \mathrm{Poisson}(3+5) = \mathrm{Poisson}(8)` by the closure result above.

For $`X-Y`, use characteristic functions: $`\varphi_{X-Y}(t)=\varphi_X(t)\varphi_Y(-t)=e^{3(e^{it}-1)}e^{5(e^{-it}-1)}`. This is the characteristic function of the **skewed Poisson** (a difference of independent Poissons), which is not a Poisson law — a reminder that convolution (sums) is closed for Poissons, but *differences* are not.

</details>

</details>

</details>

## Mixtures

A **mixture** of distributions $`\{\mu_i` with weights $`\{w_i` (where $`w_i \geq 0`, $`\sum_i w_i = 1`) is

```math
\mu = \sum_i w_i \, \mu_i.
```

- The CDF is $`F(x) = \sum_i w_i F_i(x)`.
- If the $`\mu_i` are absolutely continuous, the mixture density is $`f(x) = \sum_i w_i f_i(x)`.
- Mixtures are the natural model for **latent class** structures: the component index is a hidden variable.

<details><summary>Details</summary>

Mixtures differ from convolutions in the order of operations: a mixture is a weighted average of distributions (the component is chosen *first*, then a single sample is drawn from it), while a convolution is the distribution of a sum (both components contribute to the *same* sample). A mixture is a convex combination of measures; a convolution is a product in the characteristic-function algebra.

**Worked example (Poisson–gamma → negative binomial).** Let $`N \mid \Lambda \sim \mathrm{Poisson}(\Lambda)` and $`\Lambda \sim \mathrm{Gamma}(r, \beta)` (shape $`r`, rate $`\beta`). Marginalizing over the latent rate:

```math
P(N=k) = \int_0^\infty \frac{e^{-\lambda}\lambda^k}{k!}\,\frac{\beta^r}{\Gamma(r)}\lambda^{r-1}e^{-\beta\lambda}\,d\lambda
= \frac{\Gamma(r+k)}{k!\,\Gamma(r)}\left(\frac{\beta}{\beta+1}\right)^r\left(\frac{1}{\beta+1}\right)^k,
```

which is the negative binomial PMF. The mixture "smears" the Poisson rate and produces the heavier-tailed negative binomial — a mixture is generally *not* in the same family as its components.

**Key examples.**

- **Gaussian mixture**: $`f(x) = \sum_i w_i \, \mathcal{N}(x; \mu_i, \sigma_i^2)`. Used in clustering and density estimation.
- **Poisson mixture**: a Poisson–gamma mixture gives the negative binomial distribution (worked above).
- **Scale mixtures of normals**: $`X = \sigma Z` where $`Z \sim \mathcal{N}(0,1)` and $`\sigma^2` has some distribution. The <i>t</i>-distribution is a scale mixture of normals with an inverse-gamma mixing distribution.

The relationship to [Singular and mixed distributions](./Singular-and-mixed-distributions.md): a mixture of an atomic and a continuous distribution is a mixed distribution in the Lebesgue-decomposition sense.

> **Authoritative sources**
> - [R. D. Durrett, Probability: Theory and Examples (5th ed.)](https://sites.math.duke.edu/~rtd/PTE/pte.html)

<details><summary>Example problem</summary>

**Problem.** A coin is chosen at random: with probability $`1/3` it is fair, with probability $`2/3` it is biased with $`P(H)=3/4`. Find the mixture probability of heads, and the probability that the coin is fair given that it landed heads.

<details><summary>Solution</summary>

Mixture probability of heads: $`P(H) = \tfrac{1}{3}\cdot\tfrac{1}{2} + \tfrac{2}{3}\cdot\tfrac{3}{4} = \tfrac{1}{6}+\tfrac{1}{2} = \tfrac{2}{3}`.

By Bayes' rule, $`P(\text{fair}\mid H) = \frac{P(H\mid\text{fair})P(\text{fair})}{P(H)} = \frac{(1/2)(1/3)}{2/3} = \tfrac{1}{4}`. The latent-class (mixture) structure is exactly what makes the posterior computable.

</details>

</details>

</details>

## How the operations interact

Convolution and mixture are not interchangeable, and the distinction is the key to a clean mental map of the algebra.

- **Mixture of convolutions vs. convolution of mixtures.** A mixture of convolutions, $`\sum_i w_i(\mu_i * \nu_i)`, first forms each sum and then averages the resulting laws. A convolution of mixtures, $`(\sum_i w_i \mu_i) * (\sum_j v_j \nu_j)`, expands by bilinearity into $`\sum_{i,j} w_i v_j\,(\mu_i * \nu_j)` — a *double* sum over all cross-pairs. The two are equal only in special cases (e.g. when the mixing is degenerate). Intuitively, a mixture of convolutions keeps the two summands of each pair tied together, while a convolution of mixtures lets every component of one sum pair with every component of the other.

- **Exponential family under convolution vs. mixture.** For a closed subfamily (normal, Poisson, gamma with fixed shape, stable laws), convolution of two members stays in the family — the natural parameters add. A *mixture* of two members of the same exponential family is, in general, **not** a member of that family: a two-component Gaussian mixture is not Gaussian, and a Poisson–gamma mixture is negative binomial, not Poisson. So convolution tends to *preserve* the exponential-family structure (for closed subfamilies), while mixture tends to *destroy* it.

- **Both are linear in the measure.** Mixture is literally linear ($`\sum w_i \mu_i`); convolution is bilinear ($`(\mu_1+\mu_2)*\nu = \mu_1*\nu + \mu_2*\nu`). This linearity is why characteristic functions turn both operations into algebra: mixture becomes a weighted sum and convolution becomes a product of $`\varphi`.

## Exponential families

A one-parameter exponential family has density (or PMF) of the form

```math
f_\theta(x) = h(x) \, \exp\bigl(\theta\, T(x) - A(\theta)\bigr),
```

where $`h` is the base measure, $`T` is the **sufficient statistic**, $`\theta` is the **natural parameter**, and $`A(\theta) = \log \int h(x) e^{\theta T(x)}\, dx` is the **log-partition function** (normalizer).

Key properties:
- $`E_\theta[T(X)] = A'(\theta)` (mean of the sufficient statistic).
- $`\mathrm{Var}_\theta(T(X)) = A''(\theta)` (variance).
- The natural parameter space is $`\{\theta : A(\theta) < \infty\}`.
- Closure under convolution holds only for *specific* subfamilies (normal, Poisson, gamma with fixed shape, stable laws), not for the exponential family as a whole.

<details><summary>Details</summary>

The exponential family is the natural class for statistical inference: it is the class of distributions for which the sufficient statistic has fixed dimension regardless of sample size. The key members:

<table>
<tr><th>Distribution</th><th><i>T</i>(<i>x</i>)</th><th>θ</th><th><i>A</i>(θ)</th></tr>
<tr><td>Normal (known variance)</td><td><i>x</i></td><td>μ/σ²</td><td>μ²/(2σ²)</td></tr>
<tr><td>Poisson</td><td><i>x</i></td><td>log λ</td><td>λ</td></tr>
<tr><td>Exponential</td><td><i>x</i></td><td>−λ</td><td>−log λ</td></tr>
<tr><td>Bernoulli</td><td><i>x</i></td><td>log(<i>p</i>/(1−<i>p</i>))</td><td>−log(1−<i>p</i>)</td></tr>
<tr><td>Gamma (known shape)</td><td><i>x</i></td><td>−β</td><td>α log β</td></tr>
</table>

**Worked example (recovering the mean from $`A`).** For the Poisson family, $`h(x)=1/x!`, $`T(x)=x`, $`\theta=\log\lambda`, so $`A(\theta)=\lambda=e^{\theta}`. Then $`E[X]=A'(\theta)=e^{\theta}=\lambda` and $`\mathrm{Var}(X)=A''(\theta)=e^{\theta}=\lambda`, recovering the familiar Poisson mean and variance purely from the log-partition function.

The **conjugate prior** for an exponential family is itself a member of the exponential family (in the parameter $`\theta`). This is the algebraic reason Bayesian updating is tractable for these families. See [Statistical inference](../Statistical-inference/Readme.md) for the full treatment.

The relationship to [Absolutely continuous distributions](./Absolutely-continuous-distributions.md): the normal, exponential, gamma, and beta are all absolutely continuous members of the exponential family. The relationship to [Atomic distributions](./Atomic-distributions.md): the Poisson, binomial, and geometric are atomic members.

> **Authoritative sources**
> - [B. Efron, Exponential Families in Theory and Practice (Cambridge University Press)](https://www.cambridge.org/core/books/exponential-families-in-theory-and-practice/45CE4C98DEAB5EC9D6934E9DAC002F5F)

<details><summary>Example problem</summary>

**Problem.** Write the Bernoulli($`p`) PMF in exponential-family form and identify $`h`, $`T`, $`\theta`, and $`A`.

<details><summary>Solution</summary>

$`p^x(1-p)^{1-x} = \exp\bigl(x\log\frac{p}{1-p} + (1-x)\log(1-p)\bigr)`. So $`h(x)=1`, $`T(x)=x`, $`\theta=\log\frac{p}{1-p}`, and $`A(\theta)=-\log(1-p)=-\log(1+e^{-\theta})`. Check: $`A'(\theta)=\frac{e^{-\theta}}{1+e^{-\theta}}=\frac{1}{1+e^{\theta}}=p`, so $`E[X]=p` as expected.

</details>

</details>

</details>

## Location-scale families

A **location-scale family** is generated from a base distribution by affine transformations: if $`X_0` has CDF $`F_0`, then $`X = \mu + \sigma X_0` has CDF

```math
F(x) = F_0\bigl((x - \mu)/\sigma\bigr), \quad \sigma > 0.
```

- The **location parameter** $`\mu` shifts the distribution.
- The **scale parameter** $`\sigma` stretches it.
- The base distribution $`F_0` is the **standard** member ($`\mu = 0`, $`\sigma = 1`).

Examples: normal, logistic, uniform, Gumbel.

<details><summary>Details</summary>

Location-scale families are closed under affine transformations: the sum of independent location-scale variables from the same family is again in the family (if the base is closed under convolution). The normal family is the unique location-scale family that is also closed under convolution for all parameter values (the stable property, see below).

**Worked example (standardizing).** If $`X \sim \mathcal{N}(\mu, \sigma^2)`, then $`Z=(X-\mu)/\sigma \sim \mathcal{N}(0,1)`. Conversely, any $`\mathcal{N}(\mu,\sigma^2)` is an affine image of the standard normal, so the whole normal family is a location-scale family with base $`\mathcal{N}(0,1)`. The density transforms by the change-of-variables rule $`f_X(x)=\frac{1}{\sigma}f_0((x-\mu)/\sigma)`.

The relationship to [Absolutely continuous distributions](./Absolutely-continuous-distributions.md): the transformation formula $`f_Y(y) = \frac{1}{\sigma} f_0((y-\mu)/\sigma)` is the change-of-variables applied to the location-scale map.

<details><summary>Example problem</summary>

**Problem.** If $`X \sim \mathrm{Uniform}(0,1)`, find the CDF and density of $`Y = 3 + 2X`.

<details><summary>Solution</summary>

$`F_Y(y) = P(3+2X \le y) = P(X \le (y-3)/2) = (y-3)/2` for $`3 \le y \le 5`, and $`0`/`1` outside. So $`Y \sim \mathrm{Uniform}(3,5)`, with density $`f_Y(y)=1/2` on $`[3,5]`. The location-scale map sends the standard uniform to a uniform on any interval — the uniform family is a location-scale family.

</details>

</details>

</details>

## Stable distributions

A distribution is **stable** if the sum of independent copies, after affine rescaling, has the same distribution: for i.i.d. $`X_1, X_2 \sim F`,

```math
X_1 + X_2 \stackrel{d}{=} a X + b, \quad a > 0.
```

Stable laws are parameterized by:
- **Stability index** $`\alpha \in (0, 2]`: controls tail heaviness ($`P(|X| > t) \sim t^{-\alpha}`).
- **Skewness** $`\beta \in [-1, 1]`.
- **Location** $`\mu` and **scale** $`\sigma > 0`.

Key facts:
- $`\alpha = 2`: the normal distribution (the only stable law with finite variance).
- $`\alpha = 1`: the Cauchy distribution ($`\beta = 0`) or logistic-type ($`\beta \neq 0`).
- $`\alpha = 1/2`: the positive stable law (first-passage times of Brownian motion).
- The characteristic function is $`\varphi(t) = \exp(-\sigma^\alpha |t|^\alpha [1 - i\beta \, \mathrm{sgn}(t) \, \chi(\alpha, t)])`.
- Stable laws are the **attractors** of the generalized central limit theorem: sums of i.i.d. variables with $`\alpha`-stable tails converge to a stable law.

<details><summary>Details</summary>

The stable distributions are the universal limits for sums of heavy-tailed variables, just as the normal is the universal limit for sums of light-tailed (finite-variance) variables. The relationship to [Limit theorems](../Limit-theorems.md) is direct: the generalized CLT characterizes which stable law is the attractor based on the tail index of the summands.

**Reading the plot.** The figure below overlays three stable densities on a common axis. The normal ($`\alpha=2`) has light tails and finite variance. The Cauchy ($`\alpha=1`) has heavy tails and no finite mean. The positive stable / Lévy law ($`\alpha=1/2`) is supported on $`x>0` and has an extremely heavy right tail. As $`\alpha` decreases the tails get heavier and the peak sharper.

<svg viewBox="0 0 600 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Stable densities for alpha = 2, 1, 1/2">
  <line x1="30" y1="180" x2="570" y2="180" stroke="#333" stroke-width="1.5"/>
  <polygon points="570,180 562,176 562,184" fill="#333"/>
  <!-- normal alpha=2 -->
  <path d="M40.0 180.0 L43.2 180.0 L46.5 180.0 L49.7 180.0 L53.0 179.9 L56.2 179.9 L59.5 179.9 L62.7 179.9 L66.0 179.9 L69.2 179.9 L72.5 179.8 L75.7 179.8 L79.0 179.8 L82.2 179.7 L85.5 179.7 L88.7 179.6 L92.0 179.6 L95.2 179.5 L98.5 179.4 L101.7 179.3 L105.0 179.2 L108.2 179.1 L111.5 178.9 L114.7 178.8 L118.0 178.6 L121.2 178.4 L124.5 178.1 L127.7 177.9 L131.0 177.6 L134.2 177.2 L137.5 176.8 L140.7 176.4 L144.0 176.0 L147.2 175.5 L150.5 174.9 L153.7 174.3 L157.0 173.6 L160.2 172.9 L163.5 172.1 L166.7 171.2 L170.0 170.3 L173.2 169.3 L176.5 168.2 L179.7 167.0 L183.0 165.8 L186.2 164.5 L189.5 163.1 L192.7 161.6 L196.0 160.0 L199.2 158.4 L202.5 156.7 L205.7 154.9 L209.0 153.0 L212.2 151.1 L215.5 149.2 L218.7 147.1 L222.0 145.0 L225.2 142.9 L228.5 140.8 L231.7 138.6 L235.0 136.4 L238.2 134.3 L241.5 132.1 L244.7 130.0 L248.0 127.9 L251.2 125.8 L254.5 123.8 L257.7 121.9 L261.0 120.0 L264.2 118.3 L267.5 116.6 L270.7 115.1 L274.0 113.7 L277.2 112.5 L280.5 111.4 L283.7 110.4 L287.0 109.6 L290.2 109.0 L293.5 108.5 L296.7 108.3 L300.0 108.2 L303.2 108.3 L306.5 108.5 L309.7 109.0 L313.0 109.6 L316.2 110.4 L319.5 111.4 L322.7 112.5 L326.0 113.7 L329.2 115.1 L332.5 116.6 L335.7 118.3 L339.0 120.0 L342.2 121.9 L345.5 123.8 L348.7 125.8 L352.0 127.9 L355.2 130.0 L358.5 132.1 L361.7 134.3 L365.0 136.4 L368.2 138.6 L371.5 140.8 L374.7 142.9 L378.0 145.0 L381.2 147.1 L384.5 149.2 L387.7 151.1 L391.0 153.0 L394.2 154.9 L397.5 156.7 L400.7 158.4 L404.0 160.0 L407.2 161.6 L410.5 163.1 L413.7 164.5 L417.0 165.8 L420.2 167.0 L423.5 168.2 L426.7 169.3 L430.0 170.3 L433.2 171.2 L436.5 172.1 L439.7 172.9 L443.0 173.6 L446.2 174.3 L449.5 174.9 L452.7 175.5 L456.0 176.0 L459.2 176.4 L462.5 176.8 L465.7 177.2 L469.0 177.6 L472.2 177.9 L475.5 178.1 L478.7 178.4 L482.0 178.6 L485.2 178.8 L488.5 178.9 L491.7 179.1 L495.0 179.2 L498.2 179.3 L501.5 179.4 L504.7 179.5 L508.0 179.6 L511.2 179.6 L514.5 179.7 L517.7 179.7 L521.0 179.8 L524.2 179.8 L527.5 179.8 L530.7 179.9 L534.0 179.9 L537.2 179.9 L540.5 179.9 L543.7 179.9 L547.0 179.9 L550.2 180.0 L553.5 180.0 L556.7 180.0 L560.0 180.0" fill="none" stroke="#2b6cb0" stroke-width="2.5"/>
  <!-- cauchy alpha=1 -->
  <path d="M40.0 176.6 L43.2 176.5 L46.5 176.5 L49.7 176.4 L53.0 176.3 L56.2 176.2 L59.5 176.1 L62.7 176.0 L66.0 175.9 L69.2 175.8 L72.5 175.7 L75.7 175.6 L79.0 175.4 L82.2 175.3 L85.5 175.2 L88.7 175.0 L92.0 174.9 L95.2 174.8 L98.5 174.6 L101.7 174.4 L105.0 174.3 L108.2 174.1 L111.5 173.9 L114.7 173.7 L118.0 173.5 L121.2 173.3 L124.5 173.1 L127.7 172.9 L131.0 172.6 L134.2 172.4 L137.5 172.1 L140.7 171.8 L144.0 171.5 L147.2 171.2 L150.5 170.9 L153.7 170.5 L157.0 170.2 L160.2 169.8 L163.5 169.4 L166.7 169.0 L170.0 168.5 L173.2 168.1 L176.5 167.6 L179.7 167.0 L183.0 166.5 L186.2 165.9 L189.5 165.3 L192.7 164.6 L196.0 163.9 L199.2 163.2 L202.5 162.4 L205.7 161.5 L209.0 160.6 L212.2 159.7 L215.5 158.7 L218.7 157.6 L222.0 156.5 L225.2 155.3 L228.5 154.1 L231.7 152.7 L235.0 151.4 L238.2 149.9 L241.5 148.3 L244.7 146.7 L248.0 145.1 L251.2 143.3 L254.5 141.5 L257.7 139.7 L261.0 137.9 L264.2 136.0 L267.5 134.2 L270.7 132.4 L274.0 130.6 L277.2 129.0 L280.5 127.4 L283.7 126.1 L287.0 124.9 L290.2 124.0 L293.5 123.3 L296.7 122.8 L300.0 122.7 L303.2 122.8 L306.5 123.3 L309.7 124.0 L313.0 124.9 L316.2 126.1 L319.5 127.4 L322.7 129.0 L326.0 130.6 L329.2 132.4 L332.5 134.2 L335.7 136.0 L339.0 137.9 L342.2 139.7 L345.5 141.5 L348.7 143.3 L352.0 145.1 L355.2 146.7 L358.5 148.3 L361.7 149.9 L365.0 151.4 L368.2 152.7 L371.5 154.1 L374.7 155.3 L378.0 156.5 L381.2 157.6 L384.5 158.7 L387.7 159.7 L391.0 160.6 L394.2 161.5 L397.5 162.4 L400.7 163.2 L404.0 163.9 L407.2 164.6 L410.5 165.3 L413.7 165.9 L417.0 166.5 L420.2 167.0 L423.5 167.6 L426.7 168.1 L430.0 168.5 L433.2 169.0 L436.5 169.4 L439.7 169.8 L443.0 170.2 L446.2 170.5 L449.5 170.9 L452.7 171.2 L456.0 171.5 L459.2 171.8 L462.5 172.1 L465.7 172.4 L469.0 172.6 L472.2 172.9 L475.5 173.1 L478.7 173.3 L482.0 173.5 L485.2 173.7 L488.5 173.9 L491.7 174.1 L495.0 174.3 L498.2 174.4 L501.5 174.6 L504.7 174.8 L508.0 174.9 L511.2 175.0 L514.5 175.2 L517.7 175.3 L521.0 175.4 L524.2 175.6 L527.5 175.7 L530.7 175.8 L534.0 175.9 L537.2 176.0 L540.5 176.1 L543.7 176.2 L547.0 176.3 L550.2 176.4 L553.5 176.5 L556.7 176.5 L560.0 176.6" fill="none" stroke="#c53030" stroke-width="2.5"/>
  <!-- levy alpha=1/2 -->
  <path d="M301.3 180.0 L302.6 180.0 L303.9 178.8 L305.2 173.9 L306.5 164.7 L307.8 153.2 L309.1 141.5 L310.4 130.7 L311.7 121.5 L313.0 114.1 L314.3 108.3 L315.6 104.0 L316.9 100.8 L318.2 98.7 L319.5 97.5 L320.8 96.8 L322.1 96.8 L323.4 97.1 L324.7 97.8 L326.0 98.7 L327.3 99.8 L328.6 101.0 L329.9 102.4 L331.2 103.8 L332.5 105.3 L333.8 106.8 L335.1 108.3 L336.4 109.8 L337.7 111.3 L339.0 112.9 L340.3 114.3 L341.6 115.8 L342.9 117.2 L344.2 118.6 L345.5 120.0 L346.8 121.3 L348.1 122.6 L349.4 123.9 L350.7 125.1 L352.0 126.3 L353.3 127.4 L354.6 128.6 L355.9 129.7 L357.2 130.7 L358.5 131.7 L359.8 132.7 L361.1 133.7 L362.4 134.6 L363.7 135.6 L365.0 136.4 L366.3 137.3 L367.6 138.1 L368.9 138.9 L370.2 139.7 L371.5 140.5 L372.8 141.2 L374.1 142.0 L375.4 142.6 L376.7 143.3 L378.0 144.0 L379.3 144.6 L380.6 145.3 L381.9 145.9 L383.2 146.4 L384.5 147.0 L385.8 147.6 L387.1 148.1 L388.4 148.7 L389.7 149.2 L391.0 149.7 L392.3 150.2 L393.6 150.6 L394.9 151.1 L396.2 151.6 L397.5 152.0 L398.8 152.4 L400.1 152.8 L401.4 153.3 L402.7 153.7 L404.0 154.0 L405.3 154.4 L406.6 154.8 L407.9 155.2 L409.2 155.5 L410.5 155.9 L411.8 156.2 L413.1 156.5 L414.4 156.9 L415.7 157.2 L417.0 157.5 L418.3 157.8 L419.6 158.1 L420.9 158.4 L422.2 158.6 L423.5 158.9 L424.8 159.2 L426.1 159.5 L427.4 159.7 L428.7 160.0 L430.0 160.2 L431.3 160.5 L432.6 160.7 L433.9 160.9 L435.2 161.2 L436.5 161.4 L437.8 161.6 L439.1 161.8 L440.4 162.1 L441.7 162.3 L443.0 162.5 L444.3 162.7 L445.6 162.9 L446.9 163.1 L448.2 163.2 L449.5 163.4 L450.8 163.6 L452.1 163.8 L453.4 164.0 L454.7 164.1 L456.0 164.3 L457.3 164.5 L458.6 164.7 L459.9 164.8 L461.2 165.0 L462.5 165.1 L463.8 165.3 L465.1 165.4 L466.4 165.6 L467.7 165.7 L469.0 165.9 L470.3 166.0 L471.6 166.1 L472.9 166.3 L474.2 166.4 L475.5 166.6 L476.8 166.7 L478.1 166.8 L479.4 166.9 L480.7 167.1 L482.0 167.2 L483.3 167.3 L484.6 167.4 L485.9 167.5 L487.2 167.6 L488.5 167.8 L489.8 167.9 L491.1 168.0 L492.4 168.1 L493.7 168.2 L495.0 168.3 L496.3 168.4 L497.6 168.5 L498.9 168.6 L500.2 168.7 L501.5 168.8 L502.8 168.9 L504.1 169.0 L505.4 169.1 L506.7 169.2 L508.0 169.3 L509.3 169.4 L510.6 169.4 L511.9 169.5 L513.2 169.6 L514.5 169.7 L515.8 169.8 L517.1 169.9 L518.4 170.0 L519.7 170.0 L521.0 170.1 L522.3 170.2 L523.6 170.3 L524.9 170.3 L526.2 170.4 L527.5 170.5 L528.8 170.6 L530.1 170.6 L531.4 170.7 L532.7 170.8 L534.0 170.9 L535.3 170.9 L536.6 171.0 L537.9 171.1 L539.2 171.1 L540.5 171.2 L541.8 171.3 L543.1 171.3 L544.4 171.4 L545.7 171.4 L547.0 171.5 L548.3 171.6 L549.6 171.6 L550.9 171.7 L552.2 171.7 L553.5 171.8 L554.8 171.9 L556.1 171.9 L557.4 172.0 L558.7 172.0 L560.0 172.1" fill="none" stroke="#2f855a" stroke-width="2.5"/>
  <!-- axis ticks -->
  <line x1="300" y1="180" x2="300" y2="185" stroke="#333"/>
  <text x="300" y="198" text-anchor="middle" fill="#333" font-size="12">0</text>
  <line x1="40" y1="180" x2="40" y2="185" stroke="#333"/>
  <text x="40" y="198" text-anchor="middle" fill="#333" font-size="12">−4</text>
  <line x1="560" y1="180" x2="560" y2="185" stroke="#333"/>
  <text x="560" y="198" text-anchor="middle" fill="#333" font-size="12">4</text>
  <!-- legend -->
  <line x1="40" y1="222" x2="70" y2="222" stroke="#2b6cb0" stroke-width="2.5"/>
  <text x="75" y="226" fill="#2b6cb0" font-size="12">α = 2 (normal)</text>
  <line x1="180" y1="222" x2="210" y2="222" stroke="#c53030" stroke-width="2.5"/>
  <text x="215" y="226" fill="#c53030" font-size="12">α = 1 (Cauchy)</text>
  <line x1="330" y1="222" x2="360" y2="222" stroke="#2f855a" stroke-width="2.5"/>
  <text x="365" y="226" fill="#2f855a" font-size="12">α = 1/2 (Lévy)</text>
</svg>

The Cauchy distribution ($`\alpha = 1, \beta = 0`) has no finite moments: $`E|X| = \infty`. Its density is $`f(x) = \frac{1}{\pi(1+x^2)}` and its CDF is $`F(x) = \frac{1}{\pi}\arctan(x) + \frac{1}{2}`.

> **Authoritative sources**
> - [R. D. Durrett, Probability: Theory and Examples (5th ed.)](https://sites.math.duke.edu/~rtd/PTE/pte.html)

<details><summary>Example problem</summary>

**Problem.** If $`X_1, X_2` are i.i.d. Cauchy, show that $`(X_1+X_2)/2` is also Cauchy, and explain why the sample mean of Cauchy variables does not converge to a constant.

<details><summary>Solution</summary>

The Cauchy characteristic function is $`\varphi(t)=e^{-|t|}`. For the average, $`\varphi_{(X_1+X_2)/2}(t)=\varphi(t/2)^2=e^{-|t/2|}e^{-|t/2|}=e^{-|t|}=\varphi(t)`, so the average is again standard Cauchy. Because the mean is not a finite constant (the Cauchy has no finite mean), the law of large numbers does not apply: the sample mean has the same Cauchy law for every $`n`, so it does not concentrate.

</details>

</details>

</details>

## Transformations

A **transformation** (change of variables) pushes a distribution forward through a function: if $`Y = g(X)` and $`g` is a one-to-one differentiable map with inverse $`g^{-1}`, then the density of $`Y` is

```math
f_Y(y) = f_X\bigl(g^{-1}(y)\bigr)\,\left|\frac{d}{dy}g^{-1}(y)\right|.
```

- The **Jacobian** factor $`|d\,g^{-1}/dy|` accounts for how $`g` stretches or compresses intervals.
- Monotone maps are the clean case; for non-injective $`g` one sums over all preimages.
- Location-scale families are exactly the transformations $`g(x)=\mu+\sigma x` of a base law.

<details><summary>Details</summary>

Transformations are the third basic operation: where convolution adds independent quantities and mixture averages over latent classes, a transformation *relabels* the outcomes of a single quantity. The Jacobian is what keeps total probability equal to one: the density is rescaled by the local stretch factor so that $`\int f_Y(y)\,dy = \int f_X(x)\,dx = 1`.

**Worked example (log transform).** If $`X \sim \mathcal{N}(0,1)` and $`Y=e^X`, then $`g^{-1}(y)=\log y` with derivative $`1/y`, so $`f_Y(y)=\frac{1}{y}\frac{1}{\sqrt{2\pi}}e^{-(\log y)^2/2}` for $`y>0` — the log-normal density. The full treatment, including the multivariate Jacobian and copulas, is in [Absolutely continuous distributions](./Absolutely-continuous-distributions.md).

<details><summary>Example problem</summary>

**Problem.** If $`X \sim \mathrm{Uniform}(0,1)`, find the density of $`Y = -\ln X`.

<details><summary>Solution</summary>

$`g^{-1}(y)=e^{-y}` with derivative $`-e^{-y}`, so $`|d\,g^{-1}/dy|=e^{-y}`. Since $`f_X=1` on $`(0,1)`, $`f_Y(y)=e^{-y}` for $`y>0`. Thus $`Y \sim \mathrm{Exp}(1)`: the exponential is the log-transform of the uniform, a transformation that turns a bounded law into an unbounded one.

</details>

</details>

</details>

## Order statistics

Given i.i.d. $`X_1, \ldots, X_n` with CDF $`F`, the **order statistics** are $`X_{(1)} \leq X_{(2)} \leq \cdots \leq X_{(n)}`. The density of the $`k`-th order statistic is

```math
f_{X_{(k)}}(x) = \frac{n!}{(k-1)!(n-k)!} \, [F(x)]^{k-1} \, f(x) \, [1 - F(x)]^{n-k}.
```

- The **minimum** $`X_{(1)}` has CDF $`1 - [1-F(x)]^n`.
- The **maximum** $`X_{(n)}` has CDF $`[F(x)]^n`.
- The **range** is $`X_{(n)} - X_{(1)}`.

<details><summary>Details</summary>

Order statistics are fundamental in extreme value theory, robust statistics, and reliability. The relationship to [Limit theorems](../Limit-theorems.md): the maximum of i.i.d. samples, after appropriate normalization, converges to one of three extreme value distributions (Gumbel, Fréchet, or Weibull), depending on the tail of $`F`.

**Reading the spacings.** For a uniform sample the ordered points split $`(0,1)` into $`n+1` gaps. The figure shows a sample of $`n=5` with the spacings highlighted; these spacings are exchangeable and, in the uniform case, jointly Dirichlet.

<svg viewBox="0 0 600 130" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Order statistics of a uniform sample with spacings">
  <line x1="40" y1="70" x2="560" y2="70" stroke="#333" stroke-width="1.5"/>
  <polygon points="560,70 552,66 552,74" fill="#333"/>
  <!-- sample points at 0.12,0.31,0.47,0.68,0.86 of [40,560] -->
  <!-- x positions: 40+0.12*520=102.4 ; 0.31->201.2 ; 0.47->283.6 ; 0.68->393.6 ; 0.86->487.2 -->
  <circle cx="102" cy="70" r="5" fill="#2b6cb0"/>
  <circle cx="201" cy="70" r="5" fill="#2b6cb0"/>
  <circle cx="284" cy="70" r="5" fill="#2b6cb0"/>
  <circle cx="394" cy="70" r="5" fill="#2b6cb0"/>
  <circle cx="487" cy="70" r="5" fill="#2b6cb0"/>
  <!-- spacing brackets above -->
  <line x1="40" y1="45" x2="102" y2="45" stroke="#2f855a" stroke-width="2"/>
  <line x1="102" y1="45" x2="201" y2="45" stroke="#2f855a" stroke-width="2"/>
  <line x1="201" y1="45" x2="284" y2="45" stroke="#2f855a" stroke-width="2"/>
  <line x1="284" y1="45" x2="394" y2="45" stroke="#2f855a" stroke-width="2"/>
  <line x1="394" y1="45" x2="487" y2="45" stroke="#2f855a" stroke-width="2"/>
  <line x1="487" y1="45" x2="560" y2="45" stroke="#2f855a" stroke-width="2"/>
  <text x="71" y="35" text-anchor="middle" fill="#2f855a" font-size="11">D₀</text>
  <text x="151" y="35" text-anchor="middle" fill="#2f855a" font-size="11">D₁</text>
  <text x="242" y="35" text-anchor="middle" fill="#2f855a" font-size="11">D₂</text>
  <text x="339" y="35" text-anchor="middle" fill="#2f855a" font-size="11">D₃</text>
  <text x="440" y="35" text-anchor="middle" fill="#2f855a" font-size="11">D₄</text>
  <text x="523" y="35" text-anchor="middle" fill="#2f855a" font-size="11">D₅</text>
  <!-- labels -->
  <text x="102" y="95" text-anchor="middle" fill="#2b6cb0" font-size="11">X₍₁₎</text>
  <text x="201" y="95" text-anchor="middle" fill="#2b6cb0" font-size="11">X₍₂₎</text>
  <text x="284" y="95" text-anchor="middle" fill="#2b6cb0" font-size="11">X₍₃₎</text>
  <text x="394" y="95" text-anchor="middle" fill="#2b6cb0" font-size="11">X₍₄₎</text>
  <text x="487" y="95" text-anchor="middle" fill="#2b6cb0" font-size="11">X₍₅₎</text>
  <text x="40" y="115" text-anchor="start" fill="#333" font-size="11">0</text>
  <text x="560" y="115" text-anchor="end" fill="#333" font-size="11">1</text>
</svg>

For the uniform(0, 1) distribution, the order statistics have a simple Dirichlet structure: the spacings $`(X_{(1)}, X_{(2)} - X_{(1)}, \ldots, 1 - X_{(n)})` are distributed as a Dirichlet(1, 1, ..., 1) random vector.

> **Authoritative sources**
> - [R. D. Durrett, Probability: Theory and Examples (5th ed.)](https://sites.math.duke.edu/~rtd/PTE/pte.html)

<details><summary>Example problem</summary>

**Problem.** For $`n=3` i.i.d. $`\mathrm{Uniform}(0,1)` variables, find the density of the maximum $`X_{(3)}` and its expected value.

<details><summary>Solution</summary>

The CDF of the maximum is $`F_{X_{(3)}}(x)=x^3` for $`x\in[0,1]`, so the density is $`f_{X_{(3)}}(x)=3x^2`. The expectation is $`E[X_{(3)}]=\int_0^1 x\cdot 3x^2\,dx=\int_0^1 3x^3\,dx=3/4`. In general the maximum of $`n` uniforms has mean $`n/(n+1)`, approaching $`1` as $`n` grows.

</details>

</details>

</details>

## Example problem

**Problem.** Let $`X_1, \ldots, X_n` be i.i.d. $`\mathrm{Exp}(\lambda)`. Show that $`S_n = X_1 + \cdots + X_n` has a gamma distribution, and find its parameters. Then show that the minimum $`X_{(1)}` is also exponential, and find its rate.

<details><summary>Solution</summary>

**Sum (convolution):** The MGF of $`\mathrm{Exp}(\lambda)` is $`M(t) = \frac{\lambda}{\lambda - t}` for $`t < \lambda`. The MGF of $`S_n` is

```math
M_{S_n}(t) = \bigl(M(t)\bigr)^n = \frac{\lambda^n}{(\lambda - t)^n}.
```

This is the MGF of $`\mathrm{Gamma}(n, \lambda)` (shape $`n`, rate $`\lambda`). So $`S_n \sim \mathrm{Gamma}(n, \lambda)`.

**Minimum (order statistic):** The CDF of $`X_{(1)}` is

```math
P(X_{(1)} > x) = P(\forall i: X_i > x) = e^{-n\lambda x}.
```

Therefore $`X_{(1)} \sim \mathrm{Exp}(n\lambda)`.

The rate is $`n\lambda`: the minimum of $`n` exponentials is exponential with rate equal to the sum of the individual rates. This is the memoryless property in action.

</details>

<iframe src="./Distributional-structure-and-operations.simulation.html" title="Interactive demo: convolution of two distributions and stable laws"></iframe>

