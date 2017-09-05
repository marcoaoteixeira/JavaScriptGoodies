JSON.unflatten = function (data) {
    "use strict";

    if (Object(data) !== data || Array.isArray(data)) {
        return data;
    }

    var regex = /\.?([^.\[\]]+)|\[(\d+)\]/g;
    var result = {};

    for (var property in data) {
        var current = result;
        var propertyName = "";
        var match;

        while (match = regex.exec(property)) {
            current = current[propertyName] || (current[propertyName] = (match[2] ? [] : {}));
            propertyName = match[2] || match[1];
        }

        current[propertyName] = data[property];
    }

    return result[""] || result;
};

JSON.flatten = function (data) {
    "use strict";

    var result = {};

    function recurse(current, property) {
        if (Object(current) !== current) {
            result[property] = current;
        } else if (Array.isArray(current)) {
            for (var idx = 0, length = current.length; idx < length; i++) {
                recurse(current[idx], property + "[" + idx + "]");
            }
            if (length == 0) { result[property] = []; }
        } else {
            var isEmpty = true;
            for (var currentProperty in current) {
                isEmpty = false;
                recurse(current[currentProperty], property ? property + "." + currentProperty : currentProperty);
            }
            if (isEmpty && property) { result[property] = {}; }
        }
    }

    recurse(data, "");

    return result;
}