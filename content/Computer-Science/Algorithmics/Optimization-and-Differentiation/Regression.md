# Regression

**Regression** fits a parametric function $`f_\theta(x)` to observed data $`(x_i, y_i)` by minimizing a loss (typically mean squared error). It is the simplest optimization problem: the objective is a sum of squared residuals, and the parameters are the coefficients of the model. It is relevant whenever a continuous quantity must be predicted from features, or a parametric model must be calibrated to measurements.

> **Authoritative sources**
> - [The Elements of Statistical Learning (Hastie, Tibshirani, Friedman)](https://web.stanford.edu/~hastie/ElemStatLearn/)
> - [Convex Optimization (Boyd & Vandenberghe)](https://web.stanford.edu/~boyd/cvxbook/)
> - [Ridge Regression: Biased Estimation for Nonorthogonal Problems (Hoerl & Kennard, 1970)](https://doi.org/10.1080/00401706.1970.10488634)
> - [Regression Shrinkage and Selection via the Lasso (Tibshirani, 1996)](https://doi.org/10.1111/j.2517-6161.1996.tb02080.x)
> - [Regularization and Variable Selection via the Elastic Net (Zou & Hastie, 2005)](https://doi.org/10.1111/j.1467-9868.2005.00503.x)

## Linear regression

**Definition**: Given design matrix $`X \in \mathbb{R}^{n \times d}` and target vector $`y \in \mathbb{R}^n`, the least-squares estimator minimizes $`\|X\theta - y\|^2` and has the closed-form solution:

```math
\theta^* = (X^T X)^{-1} X^T y
```

This is the **normal equation**. It requires $`O(nd^2)` to form $`X^T X` and $`O(d^3)` to invert (or $`O(nd^2)` via QR decomposition) and is exact: no iteration needed.

<details><summary>Details</summary>

**Derivation**: the objective is $`\mathcal{L}(\theta) = (X\theta - y)^T(X\theta - y)`. Taking the gradient and setting it to zero:

```math
\nabla_\theta \mathcal{L} = 2X^T(X\theta - y) = 0 \implies X^T X \, \theta = X^T y
```

If $`X^T X` is invertible (i.e., $`X` has full column rank $`d`), the solution is unique.

**When to use the closed form**: for small $`d` (say $`d < 10^4`), the normal equation or QR decomposition is faster than any iterative method. For large $`d` (deep learning: $`d > 10^6`), the $`O(d^3)` cost is infeasible, and the loss must be minimized iteratively with [gradient descent](./Gradient-Descent.md), which defines the epoch, the learning rate, and the convergence rate.

**What the fit looks like**: the figure below shows 15 samples of $`y = 2 + 1.5x + \text{noise}` with the least-squares line $`\hat{y} = 0.90 + 1.66x` and the residuals (the vertical segments between each point and the line). The normal equation is the unique line that makes the sum of the squared residual lengths minimal.

<svg viewBox="0 0 720 440" width="100%" style="max-width:720px;font-family:system-ui,sans-serif;" role="img" aria-label="Scatter plot of 15 data points with the least-squares fitted line and the residuals"><g stroke="#e8e8e8" stroke-width="1"><line x1="50.0" y1="400.0" x2="50.0" y2="20.0"/><line x1="173.8" y1="400.0" x2="173.8" y2="20.0"/><line x1="297.6" y1="400.0" x2="297.6" y2="20.0"/><line x1="421.4" y1="400.0" x2="421.4" y2="20.0"/><line x1="545.2" y1="400.0" x2="545.2" y2="20.0"/><line x1="669.0" y1="400.0" x2="669.0" y2="20.0"/><line x1="50.0" y1="400.0" x2="700.0" y2="400.0"/><line x1="50.0" y1="305.0" x2="700.0" y2="305.0"/><line x1="50.0" y1="210.0" x2="700.0" y2="210.0"/><line x1="50.0" y1="115.0" x2="700.0" y2="115.0"/><line x1="50.0" y1="20.0" x2="700.0" y2="20.0"/></g><g stroke="#333" stroke-width="1.5"><line x1="50.0" y1="400.0" x2="700.0" y2="400.0"/><line x1="50.0" y1="400.0" x2="50.0" y2="20.0"/></g><g fill="#333" font-size="12"><text x="45.0" y="400.0">0</text><text x="168.8" y="400.0">2</text><text x="292.6" y="400.0">4</text><text x="416.4" y="400.0">6</text><text x="540.2" y="400.0">8</text><text x="664.0" y="400.0">10</text><text x="24.0" y="400.0">0</text><text x="24.0" y="305.0">5</text><text x="24.0" y="210.0">10</text><text x="24.0" y="115.0">15</text><text x="24.0" y="20.0">20</text></g><g stroke="rgba(11,98,180,0.4)" stroke-width="1"><line x1="81.0" y1="362.3" x2="81.0" y2="367.1"/><line x1="123.0" y1="332.6" x2="123.0" y2="345.7"/><line x1="165.0" y1="337.1" x2="165.0" y2="324.3"/><line x1="207.0" y1="307.1" x2="207.0" y2="302.9"/><line x1="249.0" y1="278.4" x2="249.0" y2="281.6"/><line x1="291.0" y1="232.4" x2="291.0" y2="260.2"/><line x1="333.0" y1="235.8" x2="333.0" y2="238.8"/><line x1="375.0" y1="239.8" x2="375.0" y2="217.4"/><line x1="417.0" y1="203.2" x2="417.0" y2="196.0"/><line x1="459.0" y1="223.5" x2="459.0" y2="174.7"/><line x1="501.0" y1="145.8" x2="501.0" y2="153.3"/><line x1="543.0" y1="119.8" x2="543.0" y2="131.9"/><line x1="585.0" y1="92.8" x2="585.0" y2="110.5"/><line x1="627.0" y1="90.5" x2="627.0" y2="89.1"/><line x1="669.0" y1="60.1" x2="669.0" y2="67.8"/></g><line x1="50.0" y1="382.8" x2="700.0" y2="52.0" stroke="#0b62b4" stroke-width="2.5"/><g fill="#111"><circle cx="81.0" cy="362.3" r="4"/><circle cx="123.0" cy="332.6" r="4"/><circle cx="165.0" cy="337.1" r="4"/><circle cx="207.0" cy="307.1" r="4"/><circle cx="249.0" cy="278.4" r="4"/><circle cx="291.0" cy="232.4" r="4"/><circle cx="333.0" cy="235.8" r="4"/><circle cx="375.0" cy="239.8" r="4"/><circle cx="417.0" cy="203.2" r="4"/><circle cx="459.0" cy="223.5" r="4"/><circle cx="501.0" cy="145.8" r="4"/><circle cx="543.0" cy="119.8" r="4"/><circle cx="585.0" cy="92.8" r="4"/><circle cx="627.0" cy="90.5" r="4"/><circle cx="669.0" cy="60.1" r="4"/></g><text x="433.8" y="86.5" font-size="13" fill="#0b62b4">f&#770;(x) = 0.90 + 1.66x</text></svg>

**Try it yourself**: drag the line through the points and watch the MSE change; the dashed line is the least-squares optimum.

<iframe src="./Regression.simulation.html" title="Interactive linear regression: drag the line through the points and watch the MSE change"></iframe>

**Example problem**:

<details><summary>Problem</summary>

You have $`n = 1000` samples with $`d = 3` features. The design matrix $`X` is full rank. Compare the cost of solving linear regression via the normal equation vs. 100 steps of gradient descent with $`\eta = 0.01`.

<details><summary>Solution</summary>

- Normal equation: $`O(nd^2 + d^3) = 1000 \times 9 + 27 \approx 9{,}027` FLOPs. One shot.
- Gradient descent (100 steps): each step computes $`\nabla \mathcal{L} = 2X^T(X\theta - y)` at cost $`O(nd) = 3{,}000` FLOPs. Total: $`100 \times 3{,}000 = 300{,}000` FLOPs.

For small $`d` and moderate $`n`, the closed form wins. For $`d = 10^6` (deep learning), the normal equation is infeasible ($`d^3 = 10^{18}`), and iterative methods are the only option.

</details>

</details>

</details>

When $`d > n` the normal equation has infinitely many solutions; when $`d` is large the closed form is infeasible; in both cases the model can memorize noise, which is the overfitting problem.

## Overfitting and the hat matrix

**Definition**: the fitted values of least squares are $`\hat{y} = H y` where $`H = X X^+` is the **hat matrix** ($`X^+` is the Moore–Penrose pseudoinverse; when $`X` has full column rank, $`H = X(X^T X)^{-1} X^T`). $`H` is symmetric and idempotent ($`H^2 = H`), so its trace $`\text{tr}(H) = \text{rank}(X) = \min(n, d)` is the **effective number of parameters** of the fit. When $`d \geq n` the model can interpolate the training data exactly (zero training loss) — it has enough degrees of freedom to fit the noise.

<details><summary>Details</summary>

**Why tr(H) counts parameters**: $`H` is the orthogonal projection onto the column space of $`X`. An idempotent matrix has only eigenvalues $`0` and $`1`, so $`\text{tr}(H)` — the sum of the eigenvalues — counts the $`1`s, i.e. the dimension of the column space. Each of those dimensions can absorb one independent direction of noise: the more of them, the more noise the fit can memorize.

**Bias-variance tradeoff**: the expected prediction error decomposes as:

```math
\mathbb{E}[(f_\theta(x) - y)^2] = \underbrace{(\mathbb{E}[f_\theta(x)] - f^*(x))^2}_{\text{bias}^2} + \underbrace{\text{Var}[f_\theta(x)]}_{\text{variance}} + \underbrace{\sigma^2}_{\text{irreducible noise}}
```

- **Underfitting** (high bias): the model is too simple; increasing capacity (more parameters, higher degree) reduces bias.
- **Overfitting** (high variance): the model is too complex; it fits noise in the training data. Reducing the effective number of parameters (regularization, more data) reduces variance.

**The learning curve**: the standard diagnostic is to plot the training and validation loss against training progress. The figure below shows the typical shape: the training loss keeps falling (the model keeps memorizing), while the validation loss bottoms out and then rises — the point where the two diverge is where the model starts fitting noise.

<svg viewBox="0 0 720 400" width="100%" style="max-width:720px;font-family:system-ui,sans-serif;" role="img" aria-label="Training and validation MSE over 120 iterations: training loss keeps falling while validation loss bottoms out and then rises"><g stroke="#e8e8e8" stroke-width="1"><line x1="60.0" y1="350.0" x2="60.0" y2="20.0"/><line x1="166.7" y1="350.0" x2="166.7" y2="20.0"/><line x1="273.3" y1="350.0" x2="273.3" y2="20.0"/><line x1="380.0" y1="350.0" x2="380.0" y2="20.0"/><line x1="486.7" y1="350.0" x2="486.7" y2="20.0"/><line x1="593.3" y1="350.0" x2="593.3" y2="20.0"/><line x1="700.0" y1="350.0" x2="700.0" y2="20.0"/><line x1="60.0" y1="350.0" x2="700.0" y2="350.0"/><line x1="60.0" y1="290.0" x2="700.0" y2="290.0"/><line x1="60.0" y1="230.0" x2="700.0" y2="230.0"/><line x1="60.0" y1="170.0" x2="700.0" y2="170.0"/><line x1="60.0" y1="110.0" x2="700.0" y2="110.0"/><line x1="60.0" y1="50.0" x2="700.0" y2="50.0"/></g><g stroke="#333" stroke-width="1.5"><line x1="60.0" y1="350.0" x2="700.0" y2="350.0"/><line x1="60.0" y1="350.0" x2="60.0" y2="20.0"/></g><g fill="#333" font-size="12"><text x="52.0" y="350.0">0</text><text x="158.7" y="350.0">20</text><text x="265.3" y="350.0">40</text><text x="372.0" y="350.0">60</text><text x="478.7" y="350.0">80</text><text x="585.3" y="350.0">100</text><text x="692.0" y="350.0">120</text><text x="26.0" y="350.0">0.0</text><text x="26.0" y="290.0">0.2</text><text x="26.0" y="230.0">0.4</text><text x="26.0" y="170.0">0.6</text><text x="26.0" y="110.0">0.8</text><text x="26.0" y="50.0">1.0</text></g><text x="340.0" y="388.0" font-size="13" fill="#333">training iterations</text><text x="14" y="185.0" font-size="13" fill="#333" transform="rotate(-90 14 185.0)">MSE</text><polyline points="60.0,50.0 113.3,115.0 166.7,165.7 220.0,205.1 273.3,235.9 326.7,259.8 380.0,278.4 433.3,292.9 486.7,304.2 540.0,313.0 593.3,319.9 646.7,325.2 700.0,329.4" fill="none" stroke="#0b62b4" stroke-width="2.5"/><polyline points="60.0,50.0 113.3,112.4 166.7,159.7 220.0,195.0 273.3,220.6 326.7,238.3 380.0,249.8 433.3,256.1 486.7,258.0 540.0,256.4 593.3,251.6 646.7,244.2 700.0,234.4" fill="none" stroke="#b4530b" stroke-width="2.5"/><line x1="486.7" y1="350.0" x2="486.7" y2="258.0" stroke="#b4530b" stroke-width="1" stroke-dasharray="4 4"/><circle cx="486.7" cy="258.0" r="4.5" fill="#b4530b"/><text x="497.3" y="248.0" font-size="13" fill="#b4530b">best generalization (stop here)</text><text x="566.7" y="125.0" font-size="13" fill="#b4530b">overfitting</text><g font-size="13"><rect x="80" y="30" width="14" height="3" fill="#0b62b4"/><text x="100" y="35" fill="#333">training MSE</text><rect x="210" y="30" width="14" height="3" fill="#b4530b"/><text x="230" y="35" fill="#333">validation MSE</text></g></svg>

The train/validation split and these diagnostics are general machine-learning concepts; see [Learning Paradigms and Models](../Learning-Paradigms-and-Models.md) for their treatment in the context of neural networks.

**Example problem**:

<details><summary>Problem</summary>

A linear model with $`d = 500` features is fit to $`n = 100` samples whose rows are linearly independent. (a) What are $`\text{rank}(X)` and $`\text{tr}(H)`? (b) Can the model achieve zero training loss? (c) Give two remedies for the resulting poor generalization.

<details><summary>Solution</summary>

(a) $`\text{rank}(X) = \min(n, d) = 100` (the rows are independent), and $`\text{tr}(H) = \text{rank}(X) = 100`: the fit has 100 effective parameters.

(b) Yes. Since $`d = 500 \geq n = 100`, the system $`X\theta = y` has a solution (infinitely many), so the model interpolates the training data exactly — zero training loss is guaranteed, and says nothing about generalization.

(c) 1. **Regularization**: ridge regression replaces $`X^T X` with $`X^T X + \lambda I`, which is always invertible and shrinks the coefficients (see [Regularization](#regularization)). 2. **More data**: collect additional samples so that $`n > d`, making the problem well-posed.

</details>

</details>

</details>

## Regularization

**Definition**: regularization adds a penalty on $`\theta` to the loss, trading bias for variance and reducing the effective number of parameters:

- **Ridge** (L2): $`\min_\theta \|X\theta - y\|^2 + \lambda \|\theta\|^2` — closed form $`\theta^* = (X^T X + \lambda I)^{-1} X^T y`; the matrix is always invertible, even when $`d > n`.
- **Lasso** (L1): $`\min_\theta \|X\theta - y\|^2 + \lambda \|\theta\|_1` — no closed form; solved by coordinate descent or LARS; produces sparse solutions.
- **Elastic net**: $`\min_\theta \|X\theta - y\|^2 + \lambda\left(\alpha \|\theta\|_1 + \tfrac{1-\alpha}{2}\|\theta\|^2\right)` — interpolates between the two.

<details><summary>Details</summary>

**Ridge**: with orthonormal features, each coefficient shrinks smoothly: $`\beta_j(\lambda) = \beta_j^{OLS} / (1 + \lambda / \sigma_j^2)`. The effective number of parameters becomes $`\text{tr}(H_\lambda) = \sum_j \sigma_j^2 / (\sigma_j^2 + \lambda) < d` — regularization literally reduces the degrees of freedom the model can use to fit noise. Ridge is the same L2 penalty used as weight decay in neural network training.

**Lasso**: with orthonormal features, each coefficient is soft-thresholded: $`\beta_j(\lambda) = \text{sign}(\beta_j^{OLS}) \max(|\beta_j^{OLS}| - \lambda, 0)`. Coefficients smaller than the threshold become **exactly zero** — the lasso performs feature selection, keeping at most $`\min(n, d)` features. With correlated features it tends to pick one from each group; the elastic net fixes this by adding the ridge term, which keeps correlated groups together.

**Coefficient paths**: the figure below shows the four coefficients of a fit as $`\lambda` grows from 0 (plain least squares) to 2.5. Ridge shrinks everything smoothly toward zero; the lasso drives the small coefficients exactly to zero at $`\lambda = |\beta_j^{OLS}|`.

<svg viewBox="0 0 720 420" width="100%" style="max-width:720px;font-family:system-ui,sans-serif;" role="img" aria-label="Coefficient paths as the penalty lambda grows: ridge shrinks all coefficients smoothly toward zero, lasso drives small coefficients exactly to zero"><g><text x="195.0" y="24" font-size="15" font-weight="bold" fill="#333" text-anchor="middle">Ridge (L2)</text><text x="195.0" y="44" font-size="12.5" fill="#555" text-anchor="middle">&#946;&#8346;(&#955;) = &#946;&#8346; / (1 + &#955;)</text><g stroke="#e8e8e8" stroke-width="1"><line x1="50.0" y1="380.0" x2="50.0" y2="60.0"/><line x1="108.0" y1="380.0" x2="108.0" y2="60.0"/><line x1="166.0" y1="380.0" x2="166.0" y2="60.0"/><line x1="224.0" y1="380.0" x2="224.0" y2="60.0"/><line x1="282.0" y1="380.0" x2="282.0" y2="60.0"/><line x1="340.0" y1="380.0" x2="340.0" y2="60.0"/><line x1="50.0" y1="380.0" x2="340.0" y2="380.0"/><line x1="50.0" y1="300.0" x2="340.0" y2="300.0"/><line x1="50.0" y1="220.0" x2="340.0" y2="220.0"/><line x1="50.0" y1="140.0" x2="340.0" y2="140.0"/><line x1="50.0" y1="60.0" x2="340.0" y2="60.0"/></g><g stroke="#333" stroke-width="1.5"><line x1="50.0" y1="380.0" x2="340.0" y2="380.0"/><line x1="50.0" y1="380.0" x2="50.0" y2="60.0"/></g><g fill="#333" font-size="11"><text x="44.0" y="380.0">0.0</text><text x="102.0" y="380.0">0.5</text><text x="160.0" y="380.0">1.0</text><text x="218.0" y="380.0">1.5</text><text x="276.0" y="380.0">2.0</text><text x="334.0" y="380.0">2.5</text><text x="26.0" y="380.0">0.0</text><text x="26.0" y="300.0">0.6</text><text x="26.0" y="220.0">1.1</text><text x="26.0" y="140.0">1.7</text><text x="26.0" y="60.0">2.2</text></g><text x="195.0" y="404.0" font-size="12" fill="#333" text-anchor="middle">&#955;</text><polyline points="50.0,89.1 79.0,147.3 108.0,186.1 137.0,213.8 166.0,234.5 195.0,250.7 224.0,263.6 253.0,274.2 282.0,283.0 311.0,290.5 340.0,296.9" fill="none" stroke="#0b62b4" stroke-width="2"/><polyline points="50.0,205.5 79.0,240.4 108.0,263.6 137.0,280.3 166.0,292.7 195.0,302.4 224.0,310.2 253.0,316.5 282.0,321.8 311.0,326.3 340.0,330.1" fill="none" stroke="#b4530b" stroke-width="2"/><polyline points="50.0,292.7 79.0,310.2 108.0,321.8 137.0,330.1 166.0,336.4 195.0,341.2 224.0,345.1 253.0,348.3 282.0,350.9 311.0,353.1 340.0,355.1" fill="none" stroke="#2e7d32" stroke-width="2"/><polyline points="50.0,336.4 79.0,345.1 108.0,350.9 137.0,355.1 166.0,358.2 195.0,360.6 224.0,362.5 253.0,364.1 282.0,365.5 311.0,366.6 340.0,367.5" fill="none" stroke="#c2185b" stroke-width="2"/><line x1="222" y1="80" x2="240" y2="80" stroke="#0b62b4" stroke-width="2.5"/><text x="246" y="84" font-size="11.5" fill="#333">&#946;&#8321; = 2.0</text><line x1="222" y1="100" x2="240" y2="100" stroke="#b4530b" stroke-width="2.5"/><text x="246" y="104" font-size="11.5" fill="#333">&#946;&#8322; = 1.2</text><line x1="222" y1="120" x2="240" y2="120" stroke="#2e7d32" stroke-width="2.5"/><text x="246" y="124" font-size="11.5" fill="#333">&#946;&#8323; = 0.6</text><line x1="222" y1="140" x2="240" y2="140" stroke="#c2185b" stroke-width="2.5"/><text x="246" y="144" font-size="11.5" fill="#333">&#946;&#8324; = 0.3</text></g><g><text x="545.0" y="24" font-size="15" font-weight="bold" fill="#333" text-anchor="middle">Lasso (L1)</text><text x="545.0" y="44" font-size="12.5" fill="#555" text-anchor="middle">&#946;&#8346;(&#955;) = sign(&#946;&#8346;) &#183; max(|&#946;&#8346;| &#8722; &#955;, 0)</text><g stroke="#e8e8e8" stroke-width="1"><line x1="400.0" y1="380.0" x2="400.0" y2="60.0"/><line x1="458.0" y1="380.0" x2="458.0" y2="60.0"/><line x1="516.0" y1="380.0" x2="516.0" y2="60.0"/><line x1="574.0" y1="380.0" x2="574.0" y2="60.0"/><line x1="632.0" y1="380.0" x2="632.0" y2="60.0"/><line x1="690.0" y1="380.0" x2="690.0" y2="60.0"/><line x1="400.0" y1="380.0" x2="690.0" y2="380.0"/><line x1="400.0" y1="300.0" x2="690.0" y2="300.0"/><line x1="400.0" y1="220.0" x2="690.0" y2="220.0"/><line x1="400.0" y1="140.0" x2="690.0" y2="140.0"/><line x1="400.0" y1="60.0" x2="690.0" y2="60.0"/></g><g stroke="#333" stroke-width="1.5"><line x1="400.0" y1="380.0" x2="690.0" y2="380.0"/><line x1="400.0" y1="380.0" x2="400.0" y2="60.0"/></g><g fill="#333" font-size="11"><text x="394.0" y="380.0">0.0</text><text x="452.0" y="380.0">0.5</text><text x="510.0" y="380.0">1.0</text><text x="568.0" y="380.0">1.5</text><text x="626.0" y="380.0">2.0</text><text x="684.0" y="380.0">2.5</text><text x="376.0" y="380.0">0.0</text><text x="376.0" y="300.0">0.6</text><text x="376.0" y="220.0">1.1</text><text x="376.0" y="140.0">1.7</text><text x="376.0" y="60.0">2.2</text></g><text x="545.0" y="404.0" font-size="12" fill="#333" text-anchor="middle">&#955;</text><polyline points="400.0,89.1 429.0,125.5 458.0,161.8 487.0,198.2 516.0,234.5 545.0,270.9 574.0,307.3 603.0,343.6 632.0,380.0 661.0,380.0 690.0,380.0" fill="none" stroke="#0b62b4" stroke-width="2"/><polyline points="400.0,205.5 429.0,241.8 458.0,278.2 487.0,314.5 516.0,350.9 545.0,380.0 574.0,380.0 603.0,380.0 632.0,380.0 661.0,380.0 690.0,380.0" fill="none" stroke="#b4530b" stroke-width="2"/><polyline points="400.0,292.7 429.0,329.1 458.0,365.5 487.0,380.0 516.0,380.0 545.0,380.0 574.0,380.0 603.0,380.0 632.0,380.0 661.0,380.0 690.0,380.0" fill="none" stroke="#2e7d32" stroke-width="2"/><polyline points="400.0,336.4 429.0,372.7 458.0,380.0 487.0,380.0 516.0,380.0 545.0,380.0 574.0,380.0 603.0,380.0 632.0,380.0 661.0,380.0 690.0,380.0" fill="none" stroke="#c2185b" stroke-width="2"/><line x1="572" y1="80" x2="590" y2="80" stroke="#0b62b4" stroke-width="2.5"/><text x="596" y="84" font-size="11.5" fill="#333">&#946;&#8321; = 2.0</text><line x1="572" y1="100" x2="590" y2="100" stroke="#b4530b" stroke-width="2.5"/><text x="596" y="104" font-size="11.5" fill="#333">&#946;&#8322; = 1.2</text><line x1="572" y1="120" x2="590" y2="120" stroke="#2e7d32" stroke-width="2.5"/><text x="596" y="124" font-size="11.5" fill="#333">&#946;&#8323; = 0.6</text><line x1="572" y1="140" x2="590" y2="140" stroke="#c2185b" stroke-width="2.5"/><text x="596" y="144" font-size="11.5" fill="#333">&#946;&#8324; = 0.3</text></g></svg>

**Choosing λ**: the penalty strength $`\lambda` is a hyperparameter, chosen by validation loss or cross-validation (next section).

**Example problem**:

<details><summary>Problem</summary>

A model has 500 features. The true signal depends on only 12 of them; the remaining 488 are pure noise. The unregularized least-squares fit shows 12 large coefficients and about 488 small nonzero ones. Which regularizer — ridge or lasso — better matches this structure, and why?

<details><summary>Solution</summary>

**Lasso**. Its soft-thresholding drives the 488 noise coefficients exactly to zero, recovering the sparse 12-feature model. Ridge would shrink them toward zero but never to zero, leaving all 500 features active and retaining capacity to fit noise.

</details>

</details>

</details>

## Model selection and goodness of fit

**Definition**:

- **R²** (coefficient of determination): $`R^2 = 1 - \text{SS}_{res} / \text{SS}_{tot}` with $`\text{SS}_{res} = \sum_i (y_i - \hat{y}_i)^2` and $`\text{SS}_{tot} = \sum_i (y_i - \bar{y})^2`: the fraction of the variance of $`y` explained by the model.
- **Adjusted R²**: $`R^2_{adj} = 1 - (1 - R^2) \frac{n - 1}{n - p - 1}`: penalizes the number of parameters $`p`.
- **k-fold cross-validation**: split the data into $`k` folds; train on $`k - 1` folds, evaluate on the held-out fold; average over all $`k` rotations.
- **Split protocol**: **train** (fit the model), **validation** (choose hyperparameters), **test** (one final unbiased estimate).

<details><summary>Details</summary>

**Why R² lies**: $`R^2` is computed on the training data. When $`d \geq n`, interpolation gives $`\text{SS}_{res} = 0` and $`R^2 = 1` no matter how much of the fit is noise — a training $`R^2` of 1 is a red flag, not an achievement. Adjusted $`R^2` corrects for $`p`: it can be negative (the model is worse than predicting the mean) and saturates at 1 under interpolation, so neither metric can judge an over-parameterized model — only a held-out estimate can.

**k-fold cross-validation**: $`k = 5` or $`10` in practice. Each fold is used for validation exactly once, so the estimate uses all the data. It is the standard way to choose $`\lambda` (regularization strength), the polynomial degree, and other capacity knobs.

**The split protocol**:

1. **Train**: fit the model.
2. **Validate**: choose hyperparameters ($`\lambda`, degree, early-stopping point).
3. **Test**: a single final evaluation on data never used for any decision.

**Example problem**:

<details><summary>Problem</summary>

A model with $`p = 10` parameters is fit to $`n = 100` samples and achieves training $`R^2 = 0.85`. (a) Compute the adjusted $`R^2`. (b) A colleague fits a model with $`d = 200` features to the same data and reports training $`R^2 = 1.0`. What does that tell you about its generalization?

<details><summary>Solution</summary>

(a) $`R^2_{adj} = 1 - (1 - 0.85) \times \frac{100 - 1}{100 - 10 - 1} = 1 - 0.15 \times \frac{99}{89} \approx 1 - 0.167 = 0.833`.

(b) Nothing good. $`d = 200 > n = 100`, so the model interpolates the training data ($`\text{tr}(H) = \text{rank}(X) = 100 = n`), and $`R^2 = 1` is guaranteed regardless of how much of the fit is noise. Adjusted $`R^2` is also 1 (saturated). Only a held-out estimate — cross-validation or a test set — can judge this model.

</details>

</details>

</details>

## Polynomial and nonlinear regression

**Definition**: replace each feature by a feature map $`\phi(x) = (x, x^2, \ldots, x^k)`; the model $`f(x) = \theta_0 + \theta_1 x + \cdots + \theta_k x^k` is still **linear in the parameters**, so the normal equation, ridge, lasso, $`R^2` and cross-validation all apply unchanged to the expanded design matrix. The degree $`k` is a capacity knob.

<details><summary>Details</summary>

**Feature engineering**: the only difference from linear regression is the columns of $`X`: instead of $`x`, the model sees $`(x, x^2, \ldots, x^k)`. Everything else — the closed form, the hat matrix, regularization — carries over.

**The degree as a capacity knob**: the figure below fits polynomials of degree 1, 3 and 10 to 12 noisy samples of $`y = \sin x`. Degree 1 underfits (the line cannot bend); degree 3 tracks the curve; degree 10 has 11 parameters for 12 points, so it interpolates the samples — and diverges wildly outside the data range.

<svg viewBox="0 0 720 420" width="100%" style="max-width:720px;font-family:system-ui,sans-serif;" role="img" aria-label="Polynomial fits of degree 1, 3 and 10 to 12 noisy samples of a sine curve: degree 1 underfits, degree 3 tracks the curve, degree 10 interpolates the points but diverges outside the data range"><defs><clipPath id="plot4"><rect x="50.0" y="20.0" width="650.0" height="360.0"/></clipPath></defs><g stroke="#e8e8e8" stroke-width="1"><line x1="50.0" y1="380.0" x2="50.0" y2="20.0"/><line x1="158.3" y1="380.0" x2="158.3" y2="20.0"/><line x1="266.7" y1="380.0" x2="266.7" y2="20.0"/><line x1="375.0" y1="380.0" x2="375.0" y2="20.0"/><line x1="483.3" y1="380.0" x2="483.3" y2="20.0"/><line x1="591.7" y1="380.0" x2="591.7" y2="20.0"/><line x1="700.0" y1="380.0" x2="700.0" y2="20.0"/><line x1="50.0" y1="368.8" x2="700.0" y2="368.8"/><line x1="50.0" y1="312.5" x2="700.0" y2="312.5"/><line x1="50.0" y1="256.3" x2="700.0" y2="256.3"/><line x1="50.0" y1="200.0" x2="700.0" y2="200.0"/><line x1="50.0" y1="143.8" x2="700.0" y2="143.8"/><line x1="50.0" y1="87.5" x2="700.0" y2="87.5"/><line x1="50.0" y1="31.3" x2="700.0" y2="31.3"/></g><g stroke="#333" stroke-width="1.5"><line x1="50.0" y1="200.0" x2="700.0" y2="200.0"/><line x1="50.0" y1="380.0" x2="50.0" y2="20.0"/></g><g fill="#333" font-size="12"><text x="45.0" y="380.0">0</text><text x="153.3" y="380.0">1</text><text x="261.7" y="380.0">2</text><text x="370.0" y="380.0">3</text><text x="478.3" y="380.0">4</text><text x="586.7" y="380.0">5</text><text x="695.0" y="380.0">6</text><text x="22.0" y="368.8">-1.5</text><text x="22.0" y="312.5">-1.0</text><text x="22.0" y="256.3">-0.5</text><text x="22.0" y="200.0">0.0</text><text x="22.0" y="143.8">0.5</text><text x="22.0" y="87.5">1.0</text><text x="22.0" y="31.3">1.5</text></g><polyline points="50.0,200.0 60.8,188.8 71.7,177.6 82.5,166.8 93.3,156.2 104.2,146.1 115.0,136.5 125.8,127.5 136.7,119.3 147.5,111.9 158.3,105.3 169.2,99.7 180.0,95.1 190.8,91.6 201.7,89.1 212.5,87.8 223.3,87.5 234.2,88.4 245.0,90.4 255.8,93.5 266.7,97.7 277.5,102.9 288.3,109.0 299.2,116.1 310.0,124.0 320.8,132.7 331.7,142.0 342.5,151.9 353.3,162.3 364.2,173.1 375.0,184.1 385.8,195.3 396.7,206.6 407.5,217.7 418.3,228.7 429.2,239.5 440.0,249.8 450.8,259.6 461.7,268.8 472.5,277.4 483.3,285.1 494.2,292.1 505.0,298.1 515.8,303.1 526.7,307.1 537.5,310.0 548.3,311.8 559.2,312.5 570.0,312.1 580.8,310.5 591.7,307.9 602.5,304.2 613.3,299.4 624.2,293.6 635.0,286.9 645.8,279.4 656.7,271.0 667.5,262.0 678.3,252.3 689.2,242.1 700.0,231.4" fill="none" stroke="#888" stroke-width="1.5" stroke-dasharray="6 5"/><polyline points="50.0,74.4 60.8,78.5 71.7,82.6 82.5,86.6 93.3,90.7 104.2,94.7 115.0,98.8 125.8,102.8 136.7,106.9 147.5,110.9 158.3,114.9 169.2,119.0 180.0,123.1 190.8,127.2 201.7,131.3 212.5,135.3 223.3,139.4 234.2,143.4 245.0,147.5 255.8,151.5 266.7,155.6 277.5,159.6 288.3,163.7 299.2,167.7 310.0,171.8 320.8,175.8 331.7,179.9 342.5,183.9 353.3,188.0 364.2,192.0 375.0,196.1 385.8,200.1 396.7,204.2 407.5,208.2 418.3,212.3 429.2,216.3 440.0,220.4 450.8,224.4 461.7,228.5 472.5,232.5 483.3,236.6 494.2,240.7 505.0,244.8 515.8,248.8 526.7,252.9 537.5,256.9 548.3,261.0 559.2,265.0 570.0,269.1 580.8,273.1 591.7,277.2 602.5,281.2 613.3,285.3 624.2,289.3 635.0,293.4 645.8,297.4 656.7,301.5 667.5,305.5 678.3,309.6 689.2,313.6 700.0,317.7" fill="none" stroke="#0b62b4" stroke-width="2.5"/><polyline points="50.0,227.9 60.8,206.3 71.7,186.7 82.5,169.2 93.3,153.3 104.2,139.4 115.0,127.1 125.8,116.5 136.7,107.6 147.5,100.1 158.3,94.1 169.2,89.6 180.0,86.4 190.8,84.5 201.7,83.8 212.5,84.1 223.3,85.7 234.2,88.2 245.0,91.7 255.8,96.1 266.7,101.1 277.5,107.1 288.3,113.7 299.2,120.9 310.0,128.7 320.8,137.0 331.7,145.7 342.5,154.8 353.3,164.1 364.2,173.7 375.0,183.5 385.8,193.2 396.7,203.2 407.5,212.9 418.3,222.7 429.2,232.3 440.0,241.6 450.8,250.7 461.7,259.4 472.5,267.7 483.3,275.5 494.2,282.7 505.0,289.3 515.8,295.3 526.7,300.5 537.5,304.7 548.3,308.2 559.2,310.8 570.0,312.3 580.8,312.7 591.7,311.9 602.5,310.0 613.3,306.9 624.2,302.3 635.0,296.3 645.8,288.9 656.7,280.0 667.5,269.4 678.3,257.1 689.2,243.2 700.0,227.3" fill="none" stroke="#2e7d32" stroke-width="2.5"/><g clip-path="url(#plot4)"><polyline points="50.0,1390.8 60.8,684.5 71.7,317.8 82.5,153.2 93.3,99.4 104.2,98.2 115.0,115.1 125.8,131.6 136.7,139.9 147.5,138.3 158.3,128.8 169.2,114.4 180.0,98.5 190.8,84.1 201.7,73.0 212.5,66.2 223.3,64.1 234.2,66.0 245.0,71.3 255.8,78.9 266.7,87.9 277.5,97.5 288.3,107.0 299.2,116.1 310.0,124.8 320.8,133.4 331.7,142.1 342.5,151.3 353.3,161.2 364.2,172.2 375.0,184.4 385.8,197.4 396.7,210.9 407.5,224.4 418.3,237.3 429.2,248.9 440.0,258.7 450.8,266.1 461.7,271.1 472.5,273.8 483.3,274.8 494.2,274.9 505.0,275.4 515.8,277.2 526.7,281.6 537.5,289.3 548.3,300.7 559.2,314.8 570.0,329.7 580.8,342.5 591.7,349.1 602.5,344.7 613.3,324.6 624.2,286.5 635.0,231.7 645.8,169.7 656.7,122.3 667.5,130.3 678.3,262.4 689.2,626.5 700.0,1382.9" fill="none" stroke="#c62828" stroke-width="2.5"/></g><g fill="#111"><circle cx="82.5" cy="153.2" r="4"/><circle cx="136.7" cy="139.6" r="4"/><circle cx="190.8" cy="85.9" r="4"/><circle cx="245.0" cy="65.7" r="4"/><circle cx="299.2" cy="127.3" r="4"/><circle cx="353.3" cy="145.4" r="4"/><circle cx="407.5" cy="240.3" r="4"/><circle cx="461.7" cy="259.9" r="4"/><circle cx="515.8" cy="282.8" r="4"/><circle cx="570.0" cy="327.8" r="4"/><circle cx="624.2" cy="286.9" r="4"/><circle cx="678.3" cy="262.4" r="4"/></g><g font-size="12.5"><line x1="430" y1="36" x2="452" y2="36" stroke="#888" stroke-width="1.5" stroke-dasharray="6 5"/><text x="458" y="40" fill="#333">true: sin(x)</text><line x1="430" y1="58" x2="452" y2="58" stroke="#0b62b4" stroke-width="2.5"/><text x="458" y="62" fill="#333">degree 1</text><line x1="430" y1="80" x2="452" y2="80" stroke="#2e7d32" stroke-width="2.5"/><text x="458" y="84" fill="#333">degree 3</text><line x1="430" y1="102" x2="452" y2="102" stroke="#c62828" stroke-width="2.5"/><text x="458" y="106" fill="#333">degree 10</text></g><text x="93.3" y="48.1" font-size="12.5" fill="#0b62b4">underfit</text><text x="548.3" y="351.9" font-size="12.5" fill="#c62828">overfit: diverges outside data</text></svg>

**Ill-conditioning**: as $`k` grows, the columns $`x, x^2, \ldots, x^k` become nearly collinear and the normal equation becomes numerically unstable. In practice, scale $`x` to $`[-1, 1]` or use orthogonal polynomials.

**Connection to kernel methods**: the ridge solution can be written in dual form as $`f(x) = \sum_i \alpha_i K(x_i, x)` with $`K(x, x') = x^T x'`: the prediction depends on the data only through inner products. Replacing the inner product with a **kernel** (e.g. the RBF $`K(x, x') = e^{-\|x - x'\|^2 / 2\sigma^2}`) gives a nonlinear model without writing the features explicitly; a polynomial kernel of degree $`k` is exactly polynomial regression of degree $`k`.

**When to prefer a nonlinear model**: when a linear model leaves systematic structure in the residuals (the fit bends in a consistent direction). But choose the smallest $`k` that the validation loss supports (see [Model selection](#model-selection-and-goodness-of-fit)) — the degree-10 fit above is the failure mode of turning the knob too far.

**Example problem**:

<details><summary>Problem</summary>

You fit polynomial models of degree $`k = 1, 2, 3, 4, 5` to $`n = 30` samples. The 5-fold cross-validation MSE is: 0.42, 0.18, 0.17, 0.17, 0.19. Which degree do you choose, and why not $`k = 5`?

<details><summary>Solution</summary>

Choose $`k = 3` (or 2): the CV error bottoms out at $`k = 3`, and $`k = 5` has a *higher* CV error — the extra capacity fits noise rather than signal. The rule is to pick the smallest $`k` within the noise floor of the minimum (parsimony): $`k = 2` and $`k = 3` are statistically indistinguishable here, and the simpler model wins ties.

</details>

</details>

</details>

## Quiz

**Problem**: A linear model with $`d = 300` features is trained on $`n = 100` samples (the rows of $`X` are linearly independent) by gradient descent. The learning curve shows: the training MSE decreases monotonically toward 0; the validation MSE decreases until iteration 50, then increases.

(a) What are $`\text{rank}(X)` and $`\text{tr}(H)`?
(b) Diagnose what is happening after iteration 50.
(c) If only about 10 of the 300 features carry signal, choose between ridge and lasso and justify.

<details><summary>Solution</summary>

(a) $`\text{rank}(X) \leq n = 100`, and since the rows are independent, $`\text{rank}(X) = 100`. Hence $`\text{tr}(H) = \text{rank}(X) = 100`: the model has 100 effective degrees of freedom — exactly enough to interpolate the 100 training points (zero training loss).

(b) **Overfitting**: after iteration 50 the model starts fitting the noise in the training data; the validation loss rises while the training loss keeps falling. Remedies: regularization (ridge or lasso), more data, or early stopping at iteration 50.

(c) **Lasso**: it drives the ~290 irrelevant coefficients exactly to zero (sparsity), keeping only the ~10 informative ones. Ridge would shrink them toward zero but never to zero, leaving all 300 features active.

</details>