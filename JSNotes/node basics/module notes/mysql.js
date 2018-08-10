//SELECT
connection.query('SELECT * FROM users WHERE id = ?', ['123'], function(err, rows) {
    if (err) {
        // error
    } else {
        for (let row in rows) {
            processRow(row);
        }
    }
});

/*
每一行可以用一个JavaScript对象表示，例如第一行
id | name   | birth      |
+----+--------+------------+
|  1 | Gaffey | 2007-07-07 |
 */

{
    "id": 1,
    "name": "Gaffey",
    "birth": "2007-07-07"
}

//我们选择Node的ORM框架Sequelize来操作数据库。这样，我们读写的都是JavaScript对象，
// Sequelize帮我们把对象变成数据库中的行。

//用Sequelize查询pets表，代码像这样：

Pet.findAll({
    where: {
        name: 'Gaffey'
    }
}).then(function (pets) {
        for (let pet in pets) {
            console.log(`${pet.id}: ${pet.name}`);
        }
    }).catch(function (err) {
    // error
});

//可以用ES7的await来调用任何一个Promise对象，这样我们写出来的代码就变成了：
var pets = await Pet.findAll();


/////SQL 创建表
grant all privileges on test.* to 'www'@'%' identified by 'www';

use test;

create table pets (
    id varchar(50) not null,
    name varchar(100) not null,
    gender bool not null,
    birth varchar(10) not null,
    createdAt bigint not null,
    updatedAt bigint not null,
    version bigint not null,
    primary key (id)
) engine=innodb;

//使用Sequelize操作MySQL

//第一步，创建一个sequelize对象实例：
const Sequelize = require('sequelize');
const config = require('./config');

var sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    }
});

//第二步，定义模型Pet，告诉Sequelize如何映射数据库表：
var Pet = sequelize.define('pet', {
    //我们把通过sequelize.define()返回的Pet称为Model，它表示一个数据模型。
    id: {
        type: Sequelize.STRING(50),
        primaryKey: true
    },
    name: Sequelize.STRING(100),
    gender: Sequelize.BOOLEAN,
    birth: Sequelize.STRING(10),
    createdAt: Sequelize.BIGINT,
    updatedAt: Sequelize.BIGINT,
    version: Sequelize.BIGINT
}, {
    timestamps: false
    //第三个参数是额外的配置，我们传入{ timestamps: false }
    // 是为了关闭Sequelize的自动添加timestamp的功能
});

//往数据库中塞一些数据
var now = Date.now();

Pet.create({
    id: 'g-' + now,
    name: 'Gaffey',
    gender: false,
    birth: '2007-07-07',
    createdAt: now,
    updatedAt: now,
    version: 0
}).then(function (p) {
    console.log('created.' + JSON.stringify(p));
}).catch(function (err) {
    console.log('failed: ' + err);
});

(async () => {
    var dog = await Pet.create({
        id: 'd-' + now,
        name: 'Odie',
        gender: false,
        birth: '2008-08-08',
        createdAt: now,
        updatedAt: now,
        version: 0
    });
    console.log('created: ' + JSON.stringify(dog));
})().then();

//更新数据
(async () => {
    var p = await queryFromSomewhere();
    p.gender = true;
    p.updatedAt = Date.now();
    p.version ++;
    await p.save();  //更新p的数据
    //删除
    await p.destroy();
})();

/*
一般步骤
首先，通过某个Model对象的findAll()方法获取实例；

如果要更新实例，先对实例属性赋新值，再调用save()方法；

如果要删除实例，直接调用destroy()方法。

注意findAll()方法可以接收where、order这些参数，这和将要生成的SQL语句是对应的。

一个大型Web App通常都有几十个映射表，一个映射表就是一个Model。如果按照各自喜好，
那业务代码就不好写。Model不统一，很多代码也无法复用。
所以我们需要一个统一的模型，强迫所有Model都遵守同一个规范，这样不但实现简单，
而且容易统一风格。

//model 规范
-Model存放的文件夹必须在models内，并且以Model名字命名，例如：Pet.js，User.js等等。
-统一主键，名称必须是id，类型必须是STRING(50)；
-主键可以自己指定，也可以由框架自动生成（如果为null或undefined）；
-所有字段默认为NOT NULL，除非显式指定；
-统一timestamp机制，每个Model必须有createdAt、updatedAt和version，分别记录创建时间、
修改时间和版本号。其中，createdAt和updatedAt以BIGINT存储时间戳，最大的好处是无需处
理时区，排序方便。version每次修改时自增。
 */

//用db.js统一Model的定义
const ID_TYPE = Sequelize.STRING(50);

function defineModel(name, attributes) {
    var attrs = {};
    for (let key in attributes) {
        let value = attributes[key];
        if (typeof value === 'object' && value['type']) {
            value.allowNull = value.allowNull || false;
            attrs[key] = value;
        } else {
            attrs[key] = {
                type: value,
                allowNull: false
            };
        }
    }
    attrs.id = {
        type: ID_TYPE,
        primaryKey: true
    };
    attrs.createdAt = {
        type: Sequelize.BIGINT,
        allowNull: false
    };
    attrs.updatedAt = {
        type: Sequelize.BIGINT,
        allowNull: false
    };
    attrs.version = {
        type: Sequelize.BIGINT,
        allowNull: false
    };
    return sequelize.define(name, attrs, {
        tableName: name,
        timestamps: false,
        //Sequelize在创建、修改Entity时会调用我们指定的函数，
        // 这些函数通过hooks在定义Model时设定
        hooks: {
            //在beforeValidate这个事件中根据是否是isNewRecord设置主键
            //（如果主键为null或undefined）、设置时间戳和版本号。
            beforeValidate: function (obj) {
                let now = Date.now();
                if (obj.isNewRecord) {
                    if (!obj.id) {
                        obj.id = generateId();
                    }
                    obj.createdAt = now;
                    obj.updatedAt = now;
                    obj.version = 0;
                } else {
                    obj.updatedAt = Date.now();
                    obj.version++;
                }
            }
        }
    });
}