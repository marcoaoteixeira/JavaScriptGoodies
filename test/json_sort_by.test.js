describe('JSON array sortBy functionallity', function () {
    it('Should sort by field name (string)', function () {
        require(['./src/json_sort_by'], function (sortBy) {
            var array = [{ name: 'John', age: 20 }, { name: 'Carl', age: 25 }, { name: 'Fred', age: 15 }];
            var sorted = array.sort(sortBy('name'));
            
            expect(sorted[0].name).toBe('Carl');
        });
    });
    
    it('Should sort by object', function () {
        require(['./src/json_sort_by'], function (sortBy) {
            var array = [{ name: 'John', age: 20 }, { name: 'Carl', age: 25 }, { name: 'Fred', age: 15 }];
            var sorted = array.sort(sortBy({ fieldName: 'name', converter: false, reverse: true }));
            
            expect(sorted[0].name).toBe('John');
        });
    });
    
    it('Should sort by multiple fields (string & object)', function () {
        require(['./src/json_sort_by'], function (sortBy) {
            var array = [{ name: 'John', age: 20 }, { name: 'Carl', age: 25 }, { name: 'Carl', age: 21 }, { name: 'Fred', age: 15 }];
            var sorted = array.sort(sortBy('name', { fieldName: 'age', converter: parseInt, reverse: false }));
            
            expect(sorted[0].name).toBe('Carl');
            expect(sorted[0].age).toBe(21);
        });
    });
});