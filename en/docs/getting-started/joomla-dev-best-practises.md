---
title: Best practices
author: JUG Extension Developer
---

## Overview

Here are a collection of the Joomla! Development practices you should observe when developing a component, plugin or module for Joomla.

## General Development Guidelines

- Don't use the `DS` or `DIRECTORY_SEPARATOR` constant when including files. It is no longer needed, as pointed out by Christian on php.net
- Don't depend on `register_globals`. This is a HIGH security risk, and the feature has been deprecated in PHP 5.3 and removed in 5.4.
- Don't access the `$_GET`, `$_POST`, `$_REQUEST`, `$_FILES` and `$_SERVER` superglobals directly. Use `JInput` (typically: `JFactory::getApplication()->input`) instead. JInput filters the input, helping you to easily write more secure software.
- Don't hardcode your SQL queries and do not include unescaped raw data into them. Always use `JDatabase` / `JDatabaseQuery`. It's as simple as `JFactory::getDbo()->getQuery(true)`.
- Don't use arbitrary entry points, i.e. .php files which must be accessible outside Joomla!, directly from the web. Typically used to accommodate for payment processors and image resizers, this practice is extremely insecure and strongly discouraged. Use a Joomla! component or a system plugin instead.
- Don't reinvent the wheel. If there's a Joomla! class to do that try using it before you roll your own. Chances are the core class is already good enough and much better tested.
- Do use sensible prefixes for your table names. If your component is called com_foobar it stands to reason that its tables follow the naming pattern:
  ```php
  // Good
  #__foobar_something
  
  // Bad
  #__fbr_something 
  
  //Really Bad!
  #__something
  ```
- Do test your extensions with pre-release versions of Joomla! and/or the "staging" branch of the Git repository. Making sure that users of your extension can update Joomla! safely is your responsibility.
- Do provide documentation for your extensions. Even a short video with less than stellar English is better than nothing.
- Do use JText to translate the output of your extension instead of hardcoding text. The vast majority of Joomla! users are not native English speakers and they will thank you for your consideration.
- Do comment your code. Not just for the people who have to work with it, but also yourself six months from now.
- Do test your code under real usage conditions, with real world data sets. You might be surprised at what you find.

  
