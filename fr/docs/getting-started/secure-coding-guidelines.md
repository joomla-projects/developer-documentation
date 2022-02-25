---
title: Secure coding guidelines
author: JUG Extension Developer
---

## Overview

Joomla includes many features that help with the task of securing applications and extensions built on it. You should always use these features if at all possible as they have been tried and tested by the many eyes of the developer community and any updates that might conceivably be required in the future will be automatically available whenever a Joomla update is applied. What follows is a description of best practice in using the Joomla API to ensure that your extensions are as secure as possible.

## Getting data from the request

!!! danger "All input originating from a user must be considered potentially dangerous and must be cleaned before being used." 

You should always use the Joomla `JInput` class to retrieve data from the request, rather than the raw `$_GET`, `$_POST` or `$_REQUEST` variables as the `JInput` methods apply input filtering by default. `JInput` deals with all aspects of the user request in a way that is independent of the request method used. It can also be used to retrieve cookie data and even server and environment variables. However, it is important to use the correct `JInput` method to ensure maximum security. It is very easy to just use the `JInput->get()` method with default parameters and ignore the fact that in many cases it is possible to apply a more stringent requirement on user input.

It very important to understand that the `JInput` methods are not SQL-aware and further work is required to guard against SQL injection attacks.There is no default value that will be returned if no default is specified in the call the `JInput->get()`. If no default is specified and the argument is not present in the request variable then it will return undefined.

Using `JInput` also obviates the need to pay attention to the setting of magic_quotes_gpc. `JInput` does the right thing, regardless of whether magic_quotes_gpc is on or off. See [http://php.net/manual/en/security.magicquotes.php](http://php.net/manual/en/security.magicquotes.php for further information) for further information.

When considering user input you should think about the data type you are expecting to retrieve and apply the most stringent form of `JInput` that is applicable in each case. In particular, avoid the lazy approach of using `JInput`->get as this will return an array that may contain entries that you did not expect and although each of those entries will have been cleaned, it is often the case that additional filtering could have been applied to some individual arguments. For example, the get method treats all arguments as strings, whereas it may be possible to restrict some arguments to be integers.

The first three parameters of each of the `JInput` get methods are the same. Only the first parameter is mandatory. In general, the format is:

``` php
JFactory::getApplication->input-><data-source>->get<type>( <name>, <default> )
```

where:

| Argument        | Description                          |
|-----------------| ------------------------------------ |
| `<type>`        | the data type to be retrieved (see below for the types available)  |
| `name`          | the name of the variable to be retrieved (for example, the name of an argument in a URL) |
| `default`       | 	the default value. |
| `<data-source>` | 		specifies where the variable is to be retrieved from (see below) |


## Filter options

All input values can be filtered using `JFilterInput->clean()`.

Filter an array of values.

``` php
$data = JFactory::getApplication()->input->post->get('data', array(), 'array');
$filter = JFilterInput::getInstance();

foreach ($data as $value)
{
	$array[] = $filter->clean($value, 'string');
}
```

!!! info "For more filter types see [JFilterInput source](https://github.com/joomla/joomla-cms/blob/master/libraries/joomla/filter/input.php#L115)."
