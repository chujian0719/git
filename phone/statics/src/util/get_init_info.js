Util_Person.ajax({
    url: Api['b2c']['init_info'],
    success: function(data) {
        Util_Person.init_info = data.response_data;
    },
    error: function(data) {}
});