# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-11-19

### Added
- Initial release of Koru React SDK
- `KoruProvider` component for app-wide authorization context
- `useKoruAuth` hook for accessing authorization state and data
- `useKoruConfig` hook for accessing configuration
- `KoruProtected` component for protecting routes/components
- Smart caching with configurable TTL (default: 1 hour)
- Automatic retry logic with exponential backoff (default: 3 attempts)
- Full TypeScript support with comprehensive type definitions
- Zero runtime dependencies (except React)
- Support for React 16.8+ (hooks)
- Comprehensive documentation and examples
- Basic usage example
- Next.js integration example
