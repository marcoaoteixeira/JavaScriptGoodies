'use strict';

/**
 * Used to sort an array of JSON object by multiple fields.
 * @param {sortExpression} Can be a string value or a JSON object
 * defining the field name, converter expression and reverse sort flag.
 * @example
 *      // Input: [{ name: 'John', age: 21 }, { name: 'Carl', age: 24 }, { name: 'George', age: 17 }]
 * 
 *      // Sort by field, using string value (default behavior).
 *      var sorted = jsonArray.sort(sortBy('name'));
 *      // Output: [{ name: 'Carl', age: 24 }, { name: 'George', age: 17 }, { name: 'John', age: 21 }]
 * 
 *      // Sort by JSON object
 *      var sorted = jsonArray.sort(sortBy({ fieldName: 'age', converter: parseInt, reverse: true }));
 *      // Output: [{ name: 'Carl', age: 24 }, { name: 'John', age: 21 }, { name: 'George', age: 17 }]
 * 
 *      // Sort by multiple fields
 *      var sorted = jsonArray.sort(JSON)
 * 
 * @returns {number} that number, plus one.
 */
module.exports.sortBy = function () {
	var defaultComputeFunction = function (left, right) {
		return (left != right) ? ((left < right) ? -1 : 1) : 0;
	};
	var createComputeFunction = function (converter, reverse) {
		var innerComputeFunction = defaultComputeFunction;
		var returnComputeFunction = defaultComputeFunction;

		if (converter) {
			returnComputeFunction = function (left, right) {
				return innerComputeFunction(converter(left), converter(right));
			};
		}
		if (reverse) {
			return function (left, right) {
				return -1 * returnComputeFunction(left, right);
			};
		}
		return returnComputeFunction;
	};

	var sortFields = [];
	var argumentCount = arguments.length;
	var argument;
	var fieldName;
	var reverse
	var computeFunction;

	// preprocess sorting options
	for (var index = 0; index < argumentCount; index++) {
		argument = arguments[index];
		if (typeof argument === 'string') {
			fieldName = argument;
			computeFunction = defaultComputeFunction;
		} else {
			fieldName = argument.name;
			computeFunction = createComputeFunction(argument.converter, argument.reverse);
		}
		sortFields.push({
			fieldName: fieldName,
			computeFunction: computeFunction
		});
	}

	// final comparison function
	return function (left, right) {
		var fieldName;
		var result;
		for (var index = 0; index < argumentCount; index++) {
			result = 0;
			argument = sortFields[index];
			fieldName = argument.fieldName;

			result = argument.computeFunction(left[fieldName], right[fieldName]);
			if (result !== 0) { break; }
		}
		return result;
	}
};