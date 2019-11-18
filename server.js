var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var multer = require("multer");
var upload = multer();

var mysql = require("mysql");
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "project_phase2"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.use(bodyParser.json());

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));
//form-urlencoded

// for parsing multipart/form-data
app.use(upload.array());
app.post("/save", (req, res) => {
  if (req.body.tag == 1) {
    var sql =
      "INSERT INTO customer (Name, Phone) VALUES ('" +
      req.body.name +
      "', '" +
      req.body.phone +
      "')";
    con.query(sql, function(err, result) {
      if (err) throw err;
      console.log("1 record inserted");
      res.send("<h1>SERVER IS RUNNING</h1>");
    });
  } else if (req.body.tag == 2) {
    var sql =
      "INSERT INTO vehicle (VehicleID, Description, Year, Type, Category) VALUES ('" +
      req.body.vid +
      "', '" +
      req.body.vdis +
      "', '" +
      req.body.year +
      "', '" +
      req.body.type +
      "', '" +
      req.body.cat +
      "')";

    con.query(sql, function(err, result) {
      if (err) throw err;
      console.log("1 record inserted");
      res.send("<h1>SERVER IS RUNNING</h1>");
    });
  }
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", null); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/ret", function(req, res) {
  fetchData(function(data) {
    res.send(data);
    console.log("Done. Display Data!");
  });
});

app.post("/retSelect", function(req, res) {
  var query = "select * from customer where Name like '%"+req.body.searchParam+"%';"
  fetchDataCollective(query,function(data) {
    res.send(data);
    console.log("Done. Display Data!");
  });
});

function executeQuery(sql, cb) {
  con.query(sql, function(error, result, fields) {
    if (error) {
      throw error;
    }
    cb(result);
  });
}

function fetchData(callback) {
  executeQuery("Select * from customer", function(result) {
    callback(result);
  });
}

function fetchDataCollective(query, callback) {
  executeQuery(query, function(result) {
    callback(result);
  });
}


app.get("/ret2", function(req, res) {
  fetchData2(function(data) {
    res.send(data);
    console.log("Done. Display Data!");
  });
});

function fetchData2(callback) {
  executeQuery("Select * from Vehicle", function(result) {
    callback(result);
  });
}

app.get("/ret3", function(req, res) {
  fetchData3(function(data) {
    res.send(data);
    console.log("Done. Display Data!");
  });
});

function fetchData3(callback) {
  executeQuery(
    "select Name , sum(TotalAmount) as balance from customer c, rental r where r.CustID = c.CustID group by Name",
    function(result) {
      callback(result);
    }
  );
}

app.get("/ret4", function(req, res) {
  fetchData4(function(data) {
    res.send(data);
    console.log("Done. Display Data!");
  });
});

function fetchData4(callback) {
  executeQuery(
    "select Description , Daily  from vehicle v, rate ra where v.Type = ra.Type AND v.Category = ra.Category group by Description",
    function(result) {
      callback(result);
    }
  );
}

app.listen(3000, () => {
  console.log("Sever has started on port 3000");
});
