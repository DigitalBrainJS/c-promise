# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

For changes before version 0.4.0, please see the commit history

## [0.7.1] - 2020-11-24

### Added 
- `listen` method to listen AbortController signal;

## [0.7.0] - 2020-11-24

### Added
- prepend option for the `on` method;
- handler param for ths `emitSignal` method;
- an example of using signals;

### Updated
- reworked signal system;

## [0.6.0] - 2020-11-20

### Added
- Added signals support;
- Added pause / resume methods;
- Added CPromise.allSettled method;
- Added `examples` folder;

### Removed
- CPromiseScope - now every promise handler runs directly in the context of the Promise instance;

### Updated
- Refactored;

## [0.5.3] - 2020-10-16

### Added
- `innerWeight` option for captureProgress method

## [0.5.2] - 2020-10-16

### Fixed
- README examples & jsdoc notations

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
