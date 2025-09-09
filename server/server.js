const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const session = require('express-session');
app.use(cors());
app.use(express.json());
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'mySession',
    cookie: {
        httpOnly: true,
        secure: false,
    },
}));

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "5721",
    database: "army_db"
});
const hostname = "220.119.85.212";
const port = 3005;

db.connect((error) => {
    if (error) console.log(error);
    else console.log('db connected');
});

app.listen(port, hostname, () => {
    console.log('running on port 3005');
});

app.get('/', (req, res) => {
    let datas = []
    db.query('select * from px limit 0,10', (error, rows) => { //db 테스트를 위한
        if (error) throw error;
        for (let i = 0; i < rows.length; i++) {
            datas.push({
                '상품명': rows[i]['상품명'],
                '재고량': rows[i]['재고량']
            }); 
        }
        res.json({ datas });
    });
    
});
app.post('/login', (req, res) => {
    let armyid = req.body.armyid;
    let passwd = req.body.passwd;

    db.query('select * from user where user_armyid=? and user_pw=?', [armyid, passwd], (error, rows) => {
        if (error) throw error;
        if (rows.length == 0) {
            res.json({ isUser: false });
        }
        else {
            if (req.session.user) {
                res.json({ isUser: true, unit: req.session.user.unit });
            }
            else {
                if (rows[0]['user_armyid'].length != 11) {
                    req.session.admin = {
                        id: armyid,
                        name: rows[0]['user_name'],
                        unit: rows[0]['user_unit'],
                        authorized: true
                    };
                    res.json({isUser: true});
                }
                else {
                    req.session.user = {
                        id: armyid,
                        name: rows[0]['user_name'],
                        unit: rows[0]['user_unit'],
                        authorized: true
                    };
                    res.json({ isUser: true });
                }
            } 
        }
    })
})

app.get('/logOut', (req, res) => {
    if (req.session.user || req.session.admin) {
        req.session.destroy((error) => {
            if (error) throw error;
            console.log('logged out');
            res.json( {isUser: false} );
        });
    }
    else {
        console.log('logout error');
    }
})

app.post('/searchProduct', (req, res) => {
    let product = req.body.data;
    console.log(product);
    let searchPrd = [];
    let tablename; // 테이블명을 변수로 쓰려면 ??를 써야함.
    if (req.session.user) {
        tablename = req.session.user.unit+'_px';
    }
    else if (req.session.admin) {
        tablename = req.session.admin.unit+'_px';
    }
    var like = "%" + product + "%";
    db.query('select 상품명, 재고량 from ?? where 상품명 like ?', [tablename ,like], (error, rows) => {
        if (error) throw error;
        for (let i = 0; i < rows.length; i++) {
            searchPrd.push({
                '상품명': rows[i]['상품명'],
                '재고량': rows[i]['재고량']
            });
        }
        console.log(searchPrd);
        res.json({ searchPrd });
    })
});

app.get('/getUnit', (req, res) => {
    let units = [];
    db.query('select * from unit', (error, rows) => {
        if (error) throw error;
        for (let i = 0; i < rows.length; i++) {
            units.push({
                '부대번호': rows[i]['unit_no']
            });
        }
        res.json({ units });
    });
});

app.get('/getUserInfo', (req, res) => {
    if (req.session.user) {
        res.json( {isUser: true, armyid: req.session.user.id, name: req.session.user.name, unit: req.session.user.unit} );
    }
    else if (req.session.admin) {
        res.json( {isUser: true, armyid: req.session.admin.id, name: req.session.admin.name, unit: req.session.admin.unit} );
    }
    else {
        res.json( {isUser: false} );
    }
});

app.post('/register', (req, res) => {
    let armyid = req.body.armyid;
    let name = req.body.name;
    let pw = req.body.pw;
    let unit = req.body.unit;

    db.query('insert into user (user_armyid, user_pw, user_name, user_unit) value (?,?,?,?)', [armyid, pw, name, unit], (error) => {
        if (error) throw error;
        res.json({ registered: true }); 
    });
});

app.get('/getMenu', (req, res) => {
    if (!req.session.user && !req.session.admin) {
        res.json({ error: error });
    }
    let unit = req.session.admin ? req.session.admin.unit : req.session.user.unit;
    let tablename = unit+'_menu';

    const today = new Date();
    const year = today.getFullYear(); // 2023
    const month = (today.getMonth() + 1).toString().padStart(2, '0'); // 06
    const day = today.getDate().toString().padStart(2, '0'); // 18
    const dateString = year + '-' + month + '-' + day; // 2023-06-18
    const datequery = '%'+dateString+'%';

    let breakfast = [];
    let lunch = [];
    let dinner = [];
    db.query('select * from ?? where 날짜 like ?', [tablename, datequery], (error, rows) => {
        if (error) throw error;
        for (let i = 0; i < rows.length; i++) {
            breakfast.push(
                rows[i]['조식']
            );
            lunch.push(
                rows[i]['중식']
            );
            dinner.push(
                rows[i]['석식']
            );
        }
        console.log(datequery);
        console.log(breakfast);
        res.json({breakfast: breakfast, lunch: lunch, dinner: dinner});
    });

});

app.get('/getAdminInfo', (req, res) => {
    if (req.session.admin) {
        res.json( {isUser: true, armyid: req.session.admin.id, name: req.session.admin.name, unit: req.session.admin.unit} );
    }
    else {
        res.json( {isUser: false} );
    }
});

app.post('/postQRdata', (req, res) => {
    let armyid = req.body.armyid;
    let name;
    let unit = req.session.admin.unit;
    
    let tablename = unit+'_eaten';
    console.log('qr data: '+armyid);
    db.query('select * from user where user_armyid=?', [armyid], (error, rows) => {
        if (error) throw error;
        console.log('admin unit: '+unit+', user unit: '+rows[0]['user_unit']);

        if (rows[0]['user_unit'] != unit) {
            res.json( {error: true} );
        }
        else {
            let date = new Date();
            const dateStr = date.getFullYear()+'-'+date.getMonth()+'-'+date.getDay()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
            name = rows[0]['user_name'];
            db.query('insert into ?? (eaten_date, user_armyid, user_name) value (?,?,?)', [tablename, dateStr, armyid, name], (error) => {
                if (error) throw error;
            });
            res.json( {armyid: armyid, name: name, error: false} );
        }
    });
});

app.get('/getEatenList', (req, res) => {
    let eatenBreakfast = [];
    let eatenLunch = [];
    let eatenDinner = [];
    let unit = req.session.admin.unit;
    let tablename = unit+'_eaten';
    db.query('select * from ??', [tablename], (error, rows) => {
        if (error) throw error;
        let date_splited = [];
        let hours_splited = [];
        let hour;
        for (let i = 0; i < rows.length; i++) {
            date_splited = rows[i]['eaten_date'].split(' ');
            hours_splited = date_splited[1].split(':');
            hour = hours_splited[0];
            if (hour >= 7 && hour <= 9) {
                eatenBreakfast.push({
                    armyid: rows[i]['user_armyid'],
                    name: rows[i]['user_name'],
                    time: rows[i]['eaten_date']
                });
            }
            else if (hour >= 11 && hour <= 13) {
                eatenLunch.push({
                    armyid: rows[i]['user_armyid'],
                    name: rows[i]['user_name'],
                    time: rows[i]['eaten_date']
                });
            }
            else if (hour >= 17 && hour <= 19) {
                eatenDinner.push({
                    armyid: rows[i]['user_armyid'],
                    name: rows[i]['user_name'],
                    time: rows[i]['eaten_date']
                });
            }
            else {
                console.log('its not time to eat');
            }
        }
        res.json({ eatenBreakfast, eatenLunch, eatenDinner });
    });

})
    