---
title: "Simulated annealing strategy to optimize protein folding prediction."
date: 2025-04-23
description: "A deep dive into how simulated annealing, low-level optimization, and parallel computing can enhance protein folding simulations."
tags: ["simulated annealing", "protein folding", "assembly", "openmp", "c", "performance optimization"]
---

## Project overview

In the context of my Master's Degree couse in Advanced Architectures of Processing Systems and
Programming, we developed and optimized a system that predicts protein tertiary structure using **Simulated Annealing (SA)**.

Our journey followed three progressive phases:
1. A clear, modular **C implementation**.
2. **Assembly-level optimization** for key mathematical operations.
3. **Parallelization with OpenMP** to leverage multicore CPUs.

The goal? Significantly reduce execution time without compromising result accuracy.

## Why Protein Folding?

Predicting how a protein folds is essential for understanding its function. Yet, it’s a computationally complex problem due to the astronomical number of possible conformations. Our approach uses simulated annealing to iteratively search for low-energy structures in 3D space.

## Simulated annealing
Simulated Annealing is a ***probabilistic optimization*** algorithm inspired by the annealing process in metallurgy, where a material is heated and then slowly cooled to remove defects. In computational terms, the algorithm explores the solution space by accepting not only better solutions but occasionally worse ones, especially at higher “temperatures.” As the temperature decreases, the algorithm becomes more selective, reducing the chance of getting trapped in local minima and increasing the likelihood of finding a global optimum.

## Phase 1: The C Implementation

We first implemented the core algorithm in C, focusing on:
- Modularity: each function performs a single, testable task.
- Efficient data layout: 3D coordinates stored in linear, row-major format.
- Key operations: vector normalization, 3D rotations, and distance computations between atoms.

We introduced a fast distance matrix via a **linear vector indexed with a custom formula** instead of a full 2D matrix, reducing memory and computational overhead.

## Phase 2: Assembly Optimization

To further enhance performance, we rewrote key functions like `normalize` and `apply_rotation` in Assembly using:
- **SSE and AVX instructions** for SIMD parallelism.
- Memory alignment and padding for register efficiency.
- Optimized matrix-vector multiplications.

This allowed better cache usage and faster math operations—particularly important when thousands of atoms are involved.

## Phase 3: Parallel Computing with OpenMP

Finally, we parallelized the most time-intensive sections using OpenMP:
- The `combined_energy` and `rama_energy_unrolled` functions benefited most.
- We used `#pragma omp parallel for` with dynamic scheduling and reduction clauses to efficiently share work between threads.

OpenMP helped scale performance across cores, especially for long sequences with many amino acids.

## Results

We benchmarked three main versions (C, Assembly, and OpenMP). Over 10 executions:

- **Base C**: ~1.8 s  
- **Assembly Optimized**: ~0.5 s  
- **OpenMP Parallelized**: ~0.4 s  

Also, using **double precision** in the 64-bit version dramatically improved accuracy. While `float` is faster, the `MSE` was noticeably higher, which matters in scientific contexts.

## Final Thoughts

This project showed how you can combine high-level algorithm design with low-level optimization and parallel computing to tackle real-world, computationally expensive problems like protein folding.

> “From code clarity to hardware-level performance, this journey was as much about *structure* as the proteins we simulated.”

Check out the [full project on GitHub](https://github.com/giumatt/Simulated-Annealing-for-Protein-Folding-Prediction).

---

Let us know what you think, or share your own experiments with simulated annealing and protein folding!