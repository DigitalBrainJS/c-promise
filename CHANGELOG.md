# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

For changes before version 0.4.0, please see the commit history

## [0.10.8] - 2020-12-13

### Added
- exported `promisify` method;
- `CanceledError.rethrow` method;

### Updated
- all static methods lazily bound to the constructor context;

## [0.10.7] - 2020-12-12

### Added
- `promisify` method;

## [0.10.6] - 2020-12-09

### Added
- `weight`, `innerWeight` and `label` options for the `async` decorator;

## [0.10.5] - 2020-12-08

## Updated
- Docs;
- JSDoc type annotations;
- innerWeight default value logic;

## [0.10.4] - 2020-12-08

### Added
- `@progress` decorator;

## [0.10.3] - 2020-12-08

## Fixed
- a bug with cleaning internal timer;

## [0.10.2] - 2020-12-08

### Added
- @canceled decorator

## [0.10.1] - 2020-12-07

### Updated
- Renamed AbortControllerEx class back to AbortController to be recognized by third-party libraries;  

## [0.10.0] - 2020-12-07

### Added
- decorators support;
- nativeController option for the CPromise constructor;
- named export instead of default;
- playground for decorators;
- reason argument for the AbortController's abort method;

### Removed
- dev bundles;

### Updated
- cancellation mechanics;

## [0.9.1] - 2020-11-30

### Added
- generator support for the `then` method;
- `CPromise.resolveGenerator` method;

### Updated
- refactored CPromise.from method;

## [0.9.0] - 2020-11-29

### Added
- Support for correct cancellation of multi-leaves promise chains;
- `force` option for the `cancel` method;

## [0.8.2] - 2020-11-28

### Updated
- Improved README.md;

## [0.8.1] - 2020-11-28

### Updated
- Made the promise executor optional;

## [0.8.0] - 2020-11-27

### Added 
- `canceled` method to catch CanceledError rejection;
- error throwing when trying to write read-only public property;

### Updated
- Improved `isCanceled` flag processing for catch handlers

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
