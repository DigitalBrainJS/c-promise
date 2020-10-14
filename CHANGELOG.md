# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

For changes before version 0.4.0, please see the commit history

## [0.5.1] - 2020-10-14

### Fixed
- a bug with promise cancellation for `all` method

## [0.5.0] - 2020-10-04

### Added

- Concurrency, mapper, signatures options for `all` method

### Removed

- AsyncGeneratorScope class
- Resolving numbers to a delay for `CPromise.from` method 

## [0.4.0] - 2020-09-20

### Added

- Support for an outer abort signal to cancel CPromise;
