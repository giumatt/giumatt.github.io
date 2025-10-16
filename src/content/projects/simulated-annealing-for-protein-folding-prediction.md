---
title: "Simulated annealing strategy to optimize protein folding prediction"
date: 2025-04-22
description: "A deep dive into how simulated annealing, assembly, and parallelization techniques improved a protein folding simulation pipeline."
tags: ["simulated annealing", "protein folding", "assembly", "openmp", "c", "optimization"]
---

## Introduction

This project was developed as part of the course *Advanced Architectures of Processing Systems and Programming*, within a Master's Degree in Computer Engineering. It explores the application of Simulated Annealing (SA) to the protein tertiary structure prediction problem. Our primary objective was to optimize the algorithm’s performance across three fronts: algorithm design, low-level implementation, and parallel execution.

By starting with a clean C implementation and iteratively refining it through Assembly-level tuning and OpenMP-based parallelism, we achieved a significant reduction in execution time—without compromising result accuracy or precision.

## What is Simulated Annealing?

Simulated Annealing is a metaheuristic inspired by the physical process of slowly cooling heated metals to remove internal defects. In optimization, it’s used to escape local minima by allowing (with decreasing probability) moves to worse solutions early in the process. This trade-off between exploration and exploitation enables the algorithm to converge toward a global optimum over time.

In the context of protein folding, SA is particularly suitable: the search space is vast, the energy landscape is rugged, and deterministic methods often get stuck in suboptimal conformations.

## Why Protein Folding?

A protein's function is determined by its 3D structure, which in turn arises from the sequence of amino acids. Predicting this tertiary structure is computationally challenging and biologically crucial.

We implemented a physics-inspired model using dihedral angles (ϕ and ψ) to simulate the folding process. The goal is to find an atom configuration that minimizes the total energy of the structure, balancing physical forces like electrostatic repulsion, hydrophobic interactions, and geometric constraints.

## Phase 1: Modular C Implementation

The first version of the algorithm was written entirely in C, with special attention to:

- Modular design: each operation (e.g., sine/cosine, distance, rotation) was encapsulated for testing and reuse.
- Data layout: the atomic coordinates were stored in a flat matrix using row-major order for efficient memory access.
- Geometric transformations: custom `rotation` and `apply_rotation` functions were used to manipulate 3D structures based on angle values.
- Distance computation: Instead of recomputing pairwise distances at each iteration, a dedicated `distances` vector and mapping function (`get_distance_index`) was created to store only unique atom pairs, minimizing redundancy.

This foundation ensured clean logic and good performance, setting the stage for deeper optimization.

## Phase 2: Assembly-Level Optimization

Next, we ported the most performance-critical routines to Assembly, specifically targeting:

- `normalize` function: optimized using SSE (32-bit) and AVX (64-bit) instructions to operate on 4-element vectors.
- `apply_rotation` function: matrix-vector multiplication was optimized using SIMD registers to compute dot products faster.
- Data padding and alignment: we modified vectors and matrices to align with SIMD register widths (3 → 4 elements), ensuring efficient memory access.

While rewriting the entire algorithm in Assembly was infeasible due to complexity and overhead, focusing on these hotspots led to a substantial performance boost.

## Phase 3: OpenMP Parallelization

We then introduced multi-core parallelism with OpenMP, applied to:

- `combined_energy` — a wrapper that sums hydrophobic, electrostatic, and packing energies.
- `rama_energy_unrolled` — an unrolled loop that computes energy contributions for dihedral angles.

To maximize efficiency, we used:
- `#pragma omp parallel for` for loop-level parallelism,
- `reduction` clauses to safely sum energy across threads,
- `schedule(dynamic, X)` to adaptively distribute work and minimize thread idle time.

Residual values (not divisible by 4) were handled separately to avoid over-threading trivial loops.

## Benchmark Results

We compared execution times across versions (averaged over 10 runs):

| Version                | 32-bit (s) | 64-bit (s) |
|------------------------|------------|------------|
| Base C Implementation  | 1.79       | 1.65       |
| With distance caching  | 0.82       | 0.74       |
| With loop unrolling    | 0.81       | 0.75       |
| With Assembly (SSE/AVX)| 0.54       | 0.51       |
| With OpenMP            | 0.46       | 0.41       |

We also assessed accuracy using MSE between float/double values. The 64-bit double-precision version yielded zero error vs. reference values, highlighting its scientific reliability.

## Final Thoughts

This project shows how multi-layered optimization—from algorithm logic to hardware-specific tuning—can transform a scientific simulation. Each step of refinement, from restructuring data to leveraging SIMD and multithreading, brought measurable improvements.

Explore the [full project on GitHub](https://github.com/giumatt/Simulated-Annealing-for-Protein-Folding-Prediction) and feel free to contribute, test, or fork it for your own experiments.