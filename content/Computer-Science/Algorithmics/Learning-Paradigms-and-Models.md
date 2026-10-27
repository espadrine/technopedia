# Learning Paradigms and Models

Neural networks are parametric models trained by gradient descent to map data to predictions. Their design is governed by five orthogonal axes: **architecture** (the blocks and connections that define the function), **loss** (the scalar objective that defines "good"), **data** (the paradigm that supplies the learning signal: unsupervised, supervised, or reinforcement), **training** (the loop that evaluates and updates the model at scale), and **evaluation** (the measurement of whether the model generalizes beyond its training data). This page is relevant whenever a system must adapt to data, discover structure, or make sequential decisions.

> **Authoritative sources**
> - [Deep Learning (Goodfellow, Bengio, Courville)](https://www.deeplearningbook.org/)
> - [Reinforcement Learning: An Introduction (Sutton & Barto)](https://mitpress.mit.edu/9780262039246/reinforcement-learning/)
> - [Attention Is All You Need (Vaswani et al., 2017)](https://arxiv.org/abs/1706.03762)
> - [Distilling the Knowledge in a Neural Network (Hinton, Vinyals, Dean, 2015)](https://arxiv.org/abs/1503.02531)

## Architecture

The architecture of a neural network is the composition of **blocks** (linear maps, nonlinearities, convolutions, attention) wired together with **input** representations (embeddings, tokenization) and **output** heads (softmax, sigmoid, linear). The architecture determines the function class the model can express; the loss and data determine which function in that class is selected.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 780 160" font-family="system-ui, sans-serif" font-size="12">
  <defs>
    <marker id="tf-b" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0L7,3L0,6Z" fill="#4a6fa5"/></marker>
    <marker id="tf-r" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0L7,3L0,6Z" fill="#c0504d"/></marker>
  </defs>
  <path d="M 180 100 C 180 55, 325 45, 325 104" fill="none" stroke="#c0504d" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#tf-r)"/>
  <path d="M 342 112 C 342 55, 590 45, 590 104" fill="none" stroke="#c0504d" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#tf-r)"/>
  <text x="200" y="42" fill="#c0504d">residual (skip) connections</text>
  <g fill="#eef3fb" stroke="#4a6fa5" stroke-width="1.5">
    <rect x="10" y="100" width="60" height="36" rx="6"/>
    <rect x="90" y="100" width="70" height="36" rx="6"/>
    <rect x="180" y="100" width="110" height="36" rx="6"/>
    <rect x="355" y="100" width="70" height="36" rx="6"/>
    <rect x="445" y="100" width="110" height="36" rx="6"/>
    <rect x="615" y="100" width="60" height="36" rx="6"/>
  </g>
  <circle cx="325" cy="118" r="12" fill="#ffffff" stroke="#4a6fa5" stroke-width="1.5"/>
  <circle cx="590" cy="118" r="12" fill="#ffffff" stroke="#4a6fa5" stroke-width="1.5"/>
  <g fill="#1a2a4a" text-anchor="middle">
    <text x="40" y="123">tokens x</text>
    <text x="125" y="123">LayerNorm</text>
    <text x="235" y="115">multi-head</text>
    <text x="235" y="131">self-attention</text>
    <text x="325" y="123">+</text>
    <text x="390" y="123">LayerNorm</text>
    <text x="500" y="115">feed-forward</text>
    <text x="500" y="131">MLP</text>
    <text x="590" y="123">+</text>
    <text x="645" y="123">out</text>
  </g>
  <g stroke="#4a6fa5" stroke-width="1.5" marker-end="url(#tf-b)">
    <line x1="70" y1="118" x2="88" y2="118"/>
    <line x1="160" y1="118" x2="178" y2="118"/>
    <line x1="290" y1="118" x2="311" y2="118"/>
    <line x1="337" y1="118" x2="353" y2="118"/>
    <line x1="425" y1="118" x2="443" y2="118"/>
    <line x1="565" y1="118" x2="576" y2="118"/>
    <line x1="602" y1="118" x2="613" y2="118"/>
  </g>
  <text x="390" y="155" text-anchor="middle" fill="#666">One transformer layer: each sub-block is preceded by a LayerNorm and wrapped in a residual connection. Stack L such layers.</text>
</svg>

<details><summary>Details</summary>

**Step 1 — What one layer computes.** A transformer layer applies two sub-blocks, each wrapped in a residual connection: **multi-head self-attention**, where tokens exchange information with each other, followed by a **position-wise feed-forward MLP**, where each token is transformed independently. Layer normalization stabilizes the activations before each sub-block. Stacking $`L` such layers, with positional information added at the input, gives the full model.

**Step 2 — A concrete trace: one token through one layer.** Take a sequence of three tokens with embeddings $`x_1 = [1, 0]`, $`x_2 = [0, 1]`, $`x_3 = [1, 1]`, and a single attention head with identity projections ($`W_Q = W_K = W_V = I`, $`d = 2`). For position 1:

1. **Scores**: $`q_1 \cdot k_j = x_1 \cdot x_j` gives $`[1, 0, 1]`.
2. **Softmax**: $`\text{softmax}([1, 0, 1]) \approx [0.422, 0.155, 0.422]`.
3. **Attention output**: $`0.422\,x_1 + 0.155\,x_2 + 0.422\,x_3 = [0.845, 0.538]` — a blend of all three value vectors, weighted by relevance.
4. **Residual**: $`x_1 + \text{output} = [1.845, 0.538]` — the original token enriched with information from the other tokens.

The feed-forward sub-block then transforms this vector independently, and the next layer repeats the process on the whole sequence.

**Reference — the blocks at a glance.**

**Inputs.** *One-hot encoding*: a categorical variable with $`V` classes as a $`V`-dimensional vector with a single 1; wasteful for large vocabularies. *Embeddings*: a learned dense vector $`e_c \in \mathbb{R}^d` per token; the table is a $`V \times d` matrix and lookup is a row selection; co-occurring tokens end up with nearby vectors. *Tokenization (BPE)*: iteratively merge the most frequent adjacent character pairs, balancing vocabulary size against sequence length. *Positional encoding*: transformers have no inherent order, so a position signal is added — sinusoidal $`PE(pos, 2i) = \sin(pos / 10000^{2i/d})` (fixed, extrapolates) or learned (flexible, limited to training length).

**Outputs.** *Sigmoid*: $`\sigma(z) = 1/(1+e^{-z})` maps a scalar to $`(0,1)`; used for binary classification and LSTM gates. *Softmax*: $`\text{softmax}(z)_i = e^{z_i} / \sum_j e^{z_j}` maps a vector to a probability distribution; used for multiclass heads and language-model outputs. *Pooling*: **max** preserves salient features, **min** preserves the weakest signal, **average** smooths; used in CNNs to reduce spatial resolution and to produce fixed-size sentence representations.

**Blocks.** *MLP*: $`f(x) = W_L \sigma(\cdots \sigma(W_1 x + b_1)\cdots)`; the transformer's position-wise FFN is a 2-layer MLP with $`d_{ff} \approx 4d`. *ReLU*: $`\max(0, x)`; GELU and SiLU are smooth variants that train better. *CNN*: $`y_i = \sum_j W_{i-j} x_j` with shared weights — translation invariance plus local connectivity builds a hierarchy of spatial features. *RNN / LSTM*: recurrent state $`h_t = f(h_{t-1}, x_t)`; the LSTM's cell state $`c_t = f_t \odot c_{t-1} + i_t \odot \tilde{c}_t`, $`h_t = o_t \odot \tanh(c_t)` with input/forget/output gates lets it remember over long distances. *Residual connections*: $`y = F(x) + x` let gradients reach early layers, enabling very deep stacks. *Self-attention*: $`\text{Attn}(Q, K, V) = \text{softmax}(QK^T / \sqrt{d_k})\,V`; multi-head attention runs $`h` heads in parallel and concatenates them. *KV cache*: during autoregressive generation, cached keys/values cut per-token cost from $`O(t^2)` to $`O(t)`.

**Source**: [Attention Is All You Need](https://arxiv.org/abs/1706.03762) introduces the layer traced above.

<details><summary>Example problem</summary>

A single attention head has identity projections and $`d = 2`. The sequence is $`x_1 = [1, 0]`, $`x_2 = [0, 1]`. Compute the attention weights for position 1 and the attention output at that position.

<details><summary>Solution</summary>

Scores: $`q_1 \cdot k_1 = 1`, $`q_1 \cdot k_2 = 0`. Softmax: $`[e^1/(e^1+e^0),\ e^0/(e^1+e^0)] = [2.718/3.718,\ 1/3.718] \approx [0.731, 0.269]`. Output: $`0.731\,x_1 + 0.269\,x_2 = [0.731, 0.269]`. After the residual add: $`x_1 + \text{output} = [1.731, 0.269]`.

</details>
</details>
</details>

## Loss

The loss function $`\mathcal{L}(\hat{y}, y)` is the scalar that gradient descent minimizes; it encodes what "good" means for a given task. The choice of loss determines the geometry of the optimization landscape and the statistical properties of the learned model.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 280" font-family="system-ui, sans-serif" font-size="12">
  <line x1="50" y1="240" x2="500" y2="240" stroke="#999"/>
  <line x1="50" y1="30" x2="50" y2="240" stroke="#999"/>
  <text x="16" y="40" fill="#666">loss</text>
  <text x="230" y="262" fill="#666">parameter value</text>
  <path d="M 60 60 Q 275 350 490 60" fill="none" stroke="#4a6fa5" stroke-width="2"/>
  <path d="M 60 70 C 150 205 200 215 240 200 C 280 185 310 150 350 175 C 390 200 440 215 490 80" fill="none" stroke="#c0504d" stroke-width="2"/>
  <line x1="240" y1="200" x2="240" y2="240" stroke="#c0504d" stroke-dasharray="3 3"/>
  <line x1="440" y1="212" x2="440" y2="240" stroke="#c0504d" stroke-dasharray="3 3"/>
  <text x="240" y="254" text-anchor="middle" fill="#c0504d">local min</text>
  <text x="440" y="254" text-anchor="middle" fill="#c0504d">global min</text>
  <text x="275" y="222" text-anchor="middle" fill="#4a6fa5">convex: one minimum</text>
  <text x="70" y="95" fill="#c0504d">non-convex: many minima</text>
</svg>

<details><summary>Details</summary>

**Step 1 — What a loss does.** The loss compresses "how wrong the model is on this example" into one differentiable number. Gradient descent then follows the slope of the average loss downhill. Two consequences follow: the loss must be differentiable (or subdifferentiable) in the model's outputs, and its *shape* matters — a convex loss has a single basin, while a deep network's loss surface is non-convex, full of local minima and saddle points that SGD nevertheless navigates well in practice.

**Step 2 — A concrete example: cross-entropy for a 3-class prediction.** A classifier outputs logits $`z = [1.0, 2.0, 0.5]` for three classes; the true label is class 2. Softmax gives $`\hat{y} = [0.186, 0.506, 0.309]`. The cross-entropy against the one-hot target $`y = [0, 1, 0]` is $`\mathcal{L} = -\log(0.506) \approx 0.681`. The gradient with respect to the logits is $`\hat{y} - y = [0.186, -0.494, 0.309]`: push class 2 up, push the others down, in proportion to how wrong each was.

**Reference — the losses in common use.**

**Mean squared error (MSE)**: $`\mathcal{L} = \frac{1}{n}\sum_i (\hat{y}_i - y_i)^2`. Used for regression. The gradient is proportional to the residual, so large errors dominate the update; sensitive to outliers.

**Cross-entropy**: $`\mathcal{L} = -\sum_i \sum_c y_{i,c} \log \hat{y}_{i,c}`. Used for classification; the negative log-likelihood of the true label. With softmax the gradient is $`\hat{y} - y`, which vanishes when correct and grows when wrong.

**Perplexity**: $`PPL = \exp(\mathcal{L}_{CE})`. The geometric mean number of choices the model "considers" per token; used to compare language models.

**KL divergence**: $`D_{KL}(P \| Q) = \sum_x P(x) \log \frac{P(x)}{Q(x)}`. The information lost when $`Q` approximates $`P`; used in VAEs, distillation, and GAN variants.

**Weight decay (L2 regularization)**: adds $`\lambda \|\theta\|^2` to the loss, shrinking weights toward zero. AdamW applies the decay directly to parameters ("decoupled").

**Knowledge distillation**: the student $`f_\theta` matches both hard labels and the teacher's softened outputs: $`\mathcal{L} = \alpha \cdot \text{CE}(\hat{y}, y) + (1-\alpha) \cdot T^2 \cdot D_{KL}(p_\phi / T \| p_\theta / T)`. The temperature $`T` softens the teacher's distribution so the student learns its "dark knowledge" (relative probabilities of incorrect classes).

**Source**: [Distilling the Knowledge in a Neural Network](https://arxiv.org/abs/1503.02531) introduces the distillation loss and the temperature scaling.

<details><summary>Example problem</summary>

A model predicts $`\hat{y} = [0.7, 0.2, 0.1]` for a 3-class problem whose true class is 1. Compute the cross-entropy loss and the gradient $`\hat{y} - y` with respect to the logits.

<details><summary>Solution</summary>

$`\mathcal{L} = -\ln(0.7) \approx 0.357` nats. The gradient is $`\hat{y} - y = [0.7 - 1,\ 0.2,\ 0.1] = [-0.3,\ 0.2,\ 0.1]`: the correct class logit should increase, the others decrease.

</details>
</details>
</details>

## Data

The **data paradigm** determines how the learning signal is structured. Three paradigms exist, distinguished by what the environment provides: **unsupervised** (raw data, no labels), **supervised** (input–label pairs), and **reinforcement** (sequential rewards from an environment). The paradigm dictates the loss, the architecture constraints, and the training loop.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 270" font-family="system-ui, sans-serif" font-size="12">
  <defs>
    <marker id="dt-a" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0L7,3L0,6Z" fill="#888"/></marker>
  </defs>
  <rect x="190" y="15" width="280" height="48" rx="8" fill="#eef3fb" stroke="#4a6fa5" stroke-width="1.5"/>
  <text x="320" y="36" text-anchor="middle" fill="#1a2a4a">What signal does the</text>
  <text x="320" y="52" text-anchor="middle" fill="#1a2a4a">environment provide?</text>
  <g stroke="#888" fill="none" marker-end="url(#dt-a)">
    <line x1="320" y1="63" x2="110" y2="165"/>
    <line x1="320" y1="63" x2="320" y2="165"/>
    <line x1="320" y1="63" x2="530" y2="165"/>
  </g>
  <text x="185" y="110" fill="#666">raw data, no labels</text>
  <text x="330" y="110" fill="#666">input-label pairs</text>
  <text x="440" y="110" fill="#666">rewards for actions</text>
  <g fill="#eef3fb" stroke="#4a6fa5" stroke-width="1.5">
    <rect x="15" y="170" width="190" height="70" rx="8"/>
    <rect x="225" y="170" width="190" height="70" rx="8"/>
    <rect x="435" y="170" width="190" height="70" rx="8"/>
  </g>
  <g text-anchor="middle" fill="#1a2a4a">
    <text x="110" y="194" font-weight="bold">Unsupervised</text>
    <text x="110" y="212" font-size="11">find structure in raw data</text>
    <text x="110" y="228" font-size="11">k-means, PCA, autoencoders</text>
    <text x="320" y="194" font-weight="bold">Supervised</text>
    <text x="320" y="212" font-size="11">map inputs to labels</text>
    <text x="320" y="228" font-size="11">regression, classification</text>
    <text x="530" y="194" font-weight="bold">Reinforcement</text>
    <text x="530" y="212" font-size="11">act to maximize reward</text>
    <text x="530" y="228" font-size="11">policy gradient, value functions</text>
  </g>
</svg>

<details><summary>Details</summary>

**Step 1 — The paradigm is the signal.** Before choosing an architecture or a loss, ask what the environment gives you. If you only have raw data, the model must invent its own supervision (structure: clusters, axes of variance, compressed codes, generative fidelity). If you have labels, the loss can compare the prediction to the truth directly. If an agent must *act* and only receives delayed rewards, the model must trade off exploration and long-term return. Everything downstream — loss, architecture, evaluation — follows from this choice.

**Step 2 — Unsupervised learning.** Each method targets a different notion of "structure".

**Clustering (k-means)**: partition $`n` points into $`k` groups by minimizing within-cluster variance:

```math
\min_{\{C_1,\ldots,C_k\}} \sum_{j=1}^{k} \sum_{x \in C_j} \|x - \mu_j\|^2
```

The algorithm alternates between assigning each point to the nearest centroid and recomputing centroids as cluster means; it converges to a local optimum in finite steps. Try it interactively:

<iframe src="./Learning-Paradigms-and-Models.simulation.html" title="Interactive k-means clustering: choose k, watch centroids converge"></iframe>

**PCA**: find the orthonormal basis that maximizes projected variance. Eigendecompose the covariance matrix $`\Sigma = U \Lambda U^T`; the top-$`k` eigenvectors span the maximum-variance subspace. Used for dimensionality reduction, denoising, and visualization; it is the linear special case of an autoencoder.

**Autoencoders**: a network $`x \to z \to \hat{x}` with a bottleneck $`z` learns a compressed representation by minimizing reconstruction error $`\|x - \hat{x}\|^2`. Being nonlinear, it captures manifold structure that PCA misses; variational autoencoders add a probabilistic prior on $`z` for generative modeling. (GANs and diffusion models push the same generative idea further: GANs train a generator against a discriminator in a minimax game, and diffusion models learn to reverse a gradual noising process.)

**Step 3 — Supervised learning.** Given a dataset $`\{(x_i, y_i)\}_{i=1}^{n}`, the model $`f_\theta` is trained to minimize a loss $`\mathcal{L}(f_\theta(x_i), y_i)` by gradient descent.

**Regression**: the target $`y` is continuous; the standard loss is mean squared error (see the Loss section above). Applications: price prediction, demand forecasting, sensor calibration.

**Classification**: the target $`y` is a discrete label; the loss is categorical cross-entropy (see the Loss section above), with a sigmoid head for the binary case and a softmax head for the multiclass case. Applications: image labeling, spam detection, medical diagnosis.

**Sequence labeling**: one label per input token — named-entity recognition, part-of-speech tagging, speech recognition — typically an RNN or transformer with a per-position classification head.

**Step 4 — Reinforcement learning.** An agent in a Markov Decision Process $`(S, A, P, R, \gamma)` learns a policy $`\pi(a|s)` to maximize expected cumulative reward $`V^\pi(s) = \mathbb{E}[\sum_t \gamma^t R(s_t, a_t)]`. The **Bellman equation** $`V^\pi(s) = \sum_a \pi(a|s) \sum_{s'} P(s'|s,a)[R(s,a,s') + \gamma V^\pi(s')]` links a state's value to its successors. **Policy gradient** (REINFORCE) directly ascends $`\nabla J(\theta) = \mathbb{E}[\nabla \log \pi_\theta(a|s) \cdot G_t]`; **actor-critic** adds a value function to reduce variance. When the agent must also *plan*, tree search over the state graph is used — see [Graphs](./Search-and-Data-Structures/Graphs.md) for the underlying search algorithms (best-first search, MCTS-style playouts, A*).

**Source**: [Reinforcement Learning: An Introduction](https://mitpress.mit.edu/9780262039246/reinforcement-learning/) covers MDPs, Bellman equations, and policy gradients in depth.

<details><summary>Example problem</summary>

Run one full k-means iteration on the 1-D points $`\{1, 2, 3, 8, 9\}` with $`k = 2` and initial centroids $`c_1 = 1`, $`c_2 = 9`. What are the new centroids, and has the algorithm converged after a second iteration?

<details><summary>Solution</summary>

**Assignment**: each point goes to the nearest centroid: $`\{1, 2, 3\} \to c_1` (distances 0, 1, 2 vs 8, 7, 6) and $`\{8, 9\} \to c_2` (distances 1, 0 vs 7, 6).

**Update**: $`c_1 = (1+2+3)/3 = 2`, $`c_2 = (8+9)/2 = 8.5`.

**Second iteration**: assignments are unchanged ($`\{1,2,3\}` still nearest to 2, $`\{8,9\}` still nearest to 8.5), so the centroids no longer move: the algorithm has converged to a local optimum.

</details>
</details>
</details>

## Training

Training a neural network means running a loop: sample a mini-batch, run the **forward pass** to compute predictions and loss, run the **backward pass** to get gradients, and update the parameters. Everything else — batching strategy, learning-rate schedules, distributed execution — exists to make this loop converge faster and scale further. The calculus of *how* gradients are computed (chain rule, automatic differentiation, backpropagation) is covered in [Optimization and differentiation](./Optimization-and-Differentiation/Readme.md); this section focuses on the loop itself.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 230" font-family="system-ui, sans-serif" font-size="12">
  <defs>
    <marker id="bp-b" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0L7,3L0,6Z" fill="#4a6fa5"/></marker>
    <marker id="bp-r" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0L7,3L0,6Z" fill="#c0504d"/></marker>
  </defs>
  <text x="320" y="30" text-anchor="middle" fill="#4a6fa5">forward pass: compute predictions and loss</text>
  <g fill="#eef3fb" stroke="#4a6fa5" stroke-width="1.5">
    <rect x="15" y="70" width="50" height="36" rx="6"/>
    <rect x="100" y="70" width="100" height="36" rx="6"/>
    <rect x="235" y="70" width="50" height="36" rx="6"/>
    <rect x="320" y="70" width="100" height="36" rx="6"/>
    <rect x="455" y="70" width="40" height="36" rx="6"/>
    <rect x="530" y="70" width="60" height="36" rx="6"/>
  </g>
  <g fill="#1a2a4a" text-anchor="middle">
    <text x="40" y="92">x</text>
    <text x="150" y="92">layer 1 (W1)</text>
    <text x="260" y="92">h</text>
    <text x="370" y="92">layer 2 (W2)</text>
    <text x="475" y="92">y</text>
    <text x="560" y="92">loss L</text>
  </g>
  <g stroke="#4a6fa5" stroke-width="1.5" marker-end="url(#bp-b)">
    <line x1="65" y1="88" x2="98" y2="88"/>
    <line x1="200" y1="88" x2="233" y2="88"/>
    <line x1="285" y1="88" x2="318" y2="88"/>
    <line x1="420" y1="88" x2="453" y2="88"/>
    <line x1="495" y1="88" x2="528" y2="88"/>
  </g>
  <path d="M 560 106 C 560 155, 420 155, 372 110" fill="none" stroke="#c0504d" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#bp-r)"/>
  <path d="M 340 108 C 340 190, 180 190, 152 110" fill="none" stroke="#c0504d" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#bp-r)"/>
  <text x="470" y="150" fill="#c0504d">dL/dW2</text>
  <text x="200" y="185" fill="#c0504d">dL/dW1</text>
  <text x="320" y="215" text-anchor="middle" fill="#c0504d">backward pass: gradients flow from the loss to every parameter</text>
</svg>

<details><summary>Details</summary>

**Step 1 — The training loop.** One iteration is: (1) draw a mini-batch of examples; (2) forward pass — apply the network to the batch and evaluate the loss; (3) backward pass — propagate the loss gradient back through the computation graph to every parameter; (4) update — move each parameter a small step against its gradient. Repeat until the loss stops improving. The backward pass is exactly the chain rule applied in reverse topological order over the graph recorded during the forward pass; the formulas and the automatic-differentiation machinery live in the Optimization and differentiation topic linked above.

**Step 2 — Batching and stochastic gradient descent.** Computing the gradient over the whole dataset ("full batch") is exact but expensive; computing it over one example is noisy. The mini-batch (typically 32–4096 examples) sits in the sweet spot: gradients are averaged over enough examples to be informative, and the batch is large enough to use GPU matrix multiplication efficiently. The noise of small batches is not purely a cost — it helps escape sharp minima.

**Step 3 — Learning-rate schedules.** The step size is the single most important hyperparameter. Schedules shape it over time: **step decay** (drop by 10× at milestones), **cosine decay** (smoothly anneal to zero), **warmup** (ramp up over the first few hundred steps, essential for large transformers, whose early training is unstable). Adaptive optimizers (Adam, AdamW) give each parameter its own effective step size based on gradient statistics.

**Step 4 — Initialization.** The first forward pass must neither saturate nonlinearities nor explode activations. Xavier initialization scales weights by $`1/\sqrt{n_{in}}`; He initialization by $`\sqrt{2/n_{in}}` for ReLU networks. Bad initialization shows up immediately: the loss does not decrease in the first hundred steps.

**Step 5 — Training at scale.** A single dense layer is a matrix product, and GPUs execute thousands of such products in parallel, which is why deep learning took off with GPU hardware. When a model no longer fits on one device, the training loop itself is distributed: data parallelism replicates the model and splits the batch, pipeline parallelism splits the layers across devices, and tensor parallelism splits individual weight matrices. These are distributed-systems problems (see the Distributed systems topic) layered on top of the same loop.

**Source**: [Deep Learning, chapter 8 (Optimization for Training Deep Models)](https://www.deeplearningbook.org/) covers batching, learning rates, and initialization.

<details><summary>Example problem</summary>

A scalar two-layer network computes $`\hat{y} = W_2 \cdot h` with $`h = \text{ReLU}(W_1 \cdot x)`. Given $`x = 2`, $`W_1 = 1`, $`W_2 = 2`, target $`y = 6`, and learning rate $`0.1`: compute the loss, both gradients, and the updated weights after one training step.

<details><summary>Solution</summary>

**Forward**: $`z = W_1 x = 2`, $`h = \text{ReLU}(2) = 2`, $`\hat{y} = W_2 h = 4`, $`L = (\hat{y} - y)^2 = 4`.

**Backward**: $`\partial L/\partial \hat{y} = 2(\hat{y} - y) = -4`. Then $`\partial \hat{y}/\partial W_2 = h = 2`, so $`\partial L/\partial W_2 = -8`. And $`\partial L/\partial h = \partial L/\partial \hat{y} \cdot W_2 = -8`; since $`z = 2 > 0` the ReLU passes the gradient through, and $`\partial z/\partial W_1 = x = 2`, so $`\partial L/\partial W_1 = -16`.

**Update**: $`W_2 \leftarrow 2 - 0.1 \times (-8) = 2.8`, $`W_1 \leftarrow 1 - 0.1 \times (-16) = 2.6`. The new prediction is $`\hat{y} = 2.8 \times \text{ReLU}(2.6 \times 2) = 14.56` — it overshot the target, a reminder that the gradient is only valid infinitesimally, which is why small learning rates (or schedules) matter.

</details>
</details>
</details>

## Evaluation and Generalization

A model is useful only if it performs well on data it has **not** been trained on. **Generalization** measures that gap; the machinery of evaluation — splits, curves, and model selection — tells you whether your model has learned the task or merely memorized the training set.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 280" font-family="system-ui, sans-serif" font-size="12">
  <line x1="50" y1="240" x2="500" y2="240" stroke="#999"/>
  <line x1="50" y1="30" x2="50" y2="240" stroke="#999"/>
  <text x="16" y="40" fill="#666">loss</text>
  <text x="250" y="262" fill="#666">training epochs</text>
  <path d="M 60 65 C 160 130 320 175 480 195" fill="none" stroke="#4a6fa5" stroke-width="2"/>
  <path d="M 60 75 C 150 150 220 170 260 170 C 330 172 410 205 480 240" fill="none" stroke="#c0504d" stroke-width="2"/>
  <line x1="260" y1="170" x2="260" y2="240" stroke="#555" stroke-dasharray="4 3"/>
  <text x="260" y="254" text-anchor="middle" fill="#555">early stopping</text>
  <text x="380" y="120" fill="#c0504d">overfitting: validation</text>
  <text x="380" y="136" fill="#c0504d">loss rises again</text>
  <text x="120" y="90" fill="#4a6fa5">training loss</text>
  <text x="120" y="130" fill="#c0504d">validation loss</text>
</svg>

<details><summary>Details</summary>

**Step 1 — The split.** Hold data out in three roles. The **training set** fits the parameters $`\theta`. The **validation set** is untouched by gradient descent but is looked at: it selects hyperparameters, sets the learning-rate schedule, and decides when to stop. The **test set** is touched exactly once, at the end, to report the final number — every peek at it is a form of fitting.

**Step 2 — Overfitting and underfitting.** The **generalization gap** is validation performance minus training performance. **Underfitting**: both losses are high — the model lacks capacity or training time; add capacity, train longer, or improve features. **Overfitting**: training loss keeps dropping while validation loss flattens and rises — the model is memorizing noise; add data, add regularization (weight decay, dropout), or stop earlier. The learning-curve diagram above shows the canonical signature: the two curves diverge after the early-stopping point.

**Step 3 — Model selection.** Given the validation curve, choose the checkpoint with the lowest validation loss (**early stopping**). For hyperparameters (learning rate, depth, weight decay $`\lambda`), run the same training with several values and pick by validation performance — never by training performance, which always favors the most overfit model. When data is scarce, **k-fold cross-validation** rotates the validation role across $`k` splits and averages, giving a lower-variance estimate at $`k` times the training cost.

**Step 4 — Reading curves in practice.** Noisy validation loss is normal; compare smoothed curves. A validation loss that plateaus early while training loss falls slowly suggests the learning rate is too small or the model too small. A validation loss that spikes suggests the learning rate is too large. Curves are the model's vital signs: most debugging in deep learning is curve reading.

**Source**: [Deep Learning, chapter 5 (Machine Learning Basics)](https://www.deeplearningbook.org/) formalizes the generalization gap, cross-validation, and the bias-variance trade-off.

<details><summary>Example problem</summary>

A model is trained for 6 epochs with validation losses $`[2.1, 1.4, 1.0, 0.9, 0.95, 1.15]` and training losses $`[2.0, 1.3, 0.8, 0.4, 0.15, 0.05]`. Which epoch should you deploy, and what is happening after it?

<details><summary>Solution</summary>

Deploy the **epoch-4 checkpoint**: validation loss is minimal there ($`0.9`). After epoch 4 the training loss keeps falling ($`0.4 \to 0.05`) while validation loss rises ($`0.9 \to 1.15`): the model has begun to **overfit**, memorizing training examples that do not transfer. Early stopping at epoch 4 (or stronger regularization) is the fix.

</details>
</details>
</details>

## Quiz

**Problem**: You design a transformer-based language model with embedding dimension $`d = 512`, 8 attention heads, 4 layers, feedforward hidden dimension $`d_{ff} = 2048`, and vocabulary size $`V = 32\,000`. (a) Compute the number of parameters in a single transformer layer (multi-head attention + position-wise feedforward + two layer norms; ignore positional encoding and the embedding/output matrices). (b) The model is trained with cross-entropy loss. If the validation perplexity is 8.0, what is the cross-entropy loss per token? (c) You distill the model into a smaller student with temperature $`T = 4` and mixing weight $`\alpha = 0.5`. Write the combined distillation loss.

<details><summary>Solution</summary>

**(a)** A single transformer layer contains:

- **Multi-head self-attention**: four $`d \times d` weight matrices ($`W_Q, W_K, W_V, W_O`): $`4 \times 512^2 = 1\,048\,576` parameters.
- **Position-wise feedforward**: two matrices ($`W_1 \in \mathbb{R}^{d \times d_{ff}}`, $`W_2 \in \mathbb{R}^{d_{ff} \times d}`): $`2 \times 512 \times 2048 = 2\,097\,152` parameters.
- **Two layer norms**: each has a scale and a bias vector of length $`d`: $`2 \times 2 \times 512 = 2\,048` parameters.

Total: $`1\,048\,576 + 2\,097\,152 + 2\,048 = 3\,147\,776` parameters per layer.

**(b)** Perplexity is defined as $`PPL = \exp(\mathcal{L}_{CE})`, so the cross-entropy loss per token is $`\mathcal{L}_{CE} = \ln(8) \approx 2.079` nats.

**(c)** The combined distillation loss is:

```math
\mathcal{L} = \alpha \cdot \text{CE}(\hat{y}, y) + (1-\alpha) \cdot T^2 \cdot D_{KL}\!\left(\frac{p_\phi}{T} \;\Big\|\; \frac{p_\theta}{T}\right)
```

Substituting $`\alpha = 0.5` and $`T = 4`:

```math
\mathcal{L} = 0.5 \cdot \text{CE}(\hat{y}, y) + 8 \cdot D_{KL}\!\left(\frac{p_\phi}{4} \;\Big\|\; \frac{p_\theta}{4}\right)
```

The coefficient $`8` multiplying the KL term is the **combined product** $`(1-\alpha) \cdot T^2 = 0.5 \times 16 = 8` — the mixing weight times the squared temperature, not $`T^2` alone. The temperature softens the teacher's distribution (which shrinks the KL term's magnitude), the $`T^2` factor compensates for that softening, and the $`(1-\alpha)` weight balances the hard-label and soft-label contributions equally.

</details>
