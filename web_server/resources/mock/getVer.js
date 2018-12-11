const Mock = require('mockjs')
const Random = Mock.Random;
var image1 = Random.image('4*2', '#ccc', 'data');

// var data1= Mock.mock({
//     "url": "test.iwoyi.cn:8899/uploads/201811/28/p497_idencode.png",
//     "status": 1,
//     "data|2": Random.string('dddddfffffwwwww', 4),
//     'imag_code': Random.image('4*2', '#ccc', 'data'),
//     "code|20": "@string('upper', 4)"
// });
// console.log()

module.exports = Mock.mock({
    "url": "test.iwoyi.cn:8899/uploads/201811/28/p497_idencode.png",
    "status": 1,
    "data|50": [{
        'imag_code': Random.image('110px*35px', '@hex()', '@string("upper", 4)')
    }]
})
/*
var data2 = [];
for (let i = 0; i < data1.code.length; i += 4) {
    data2.push(Mock.mock({
        'imag|+1': '@image(6*3 ,@hex())'
    }))
}

var data = Object.assign(data1, data2)


*/