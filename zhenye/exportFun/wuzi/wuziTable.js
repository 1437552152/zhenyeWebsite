/*
 * @Description:
 * @version:
 * @Date: 2019-08-14 21:29:11
 * @LastEditors: yeyifu
 * @LastEditTime: 2019-09-25 21:43:09
 * @Author: yeyifu
 * @LastModifiedBy: yeyifu
 */
var db = require("../../conf/conf");
var nodeExcel = require('excel-export');
const { formatDate } = require("../exportFun");
//获取防疫物资
const getWuZiTable = (req, res) => {
  let allCount;
  let pageNo = parseInt(req.body.pageNo);
  let pageSize = parseInt(req.body.pageSize);
  let sql = "SELECT COUNT(*) FROM form where isShow=0";
  let sql2 =
    "SELECT*FROM form where isShow=0 Order By id desc limit" +
    " " +
    (pageNo - 1) * pageSize +
    "," +
    pageNo * pageSize;
  db.query(sql, function (err, results) {
    if (err) {
      res.json({
        msg: err.toString(),
        code: 500,
      });
    } else {
      allCount = results[0]["COUNT(*)"];
      back(allCount);
    }
  });

  function back(allCount) {
    db.query(sql2, function (err, results) {
      if (err) {
        res.json({
          msg: err.toString(),
          code: 500,
        });
      } else {
        var allPage = allCount / pageSize;
        var pageStr = allPage.toString();
        // 不能整除
        if (pageStr.indexOf(".") > 0) {
          allPage = parseInt(pageStr.split(".")[0]) + 1;
        }
        res.json({
          msg: "操作成功",
          status: "200",
          totalPages: allPage,
          data: results,
          total: allCount,
          currentPage: parseInt(pageNo),
        });
      }
    });
  }
};



const getWuGYTable = (req, res) => {
  let allCount;
  let pageNo = parseInt(req.body.pageNo);
  let pageSize = parseInt(req.body.pageSize);
  let sql = "SELECT COUNT(*) FROM supplier where isShow=0";
  let sql2 =
    "SELECT*FROM supplier where isShow=0 Order By id desc limit" +
    " " +
    (pageNo - 1) * pageSize +
    "," +
    pageNo * pageSize;
  db.query(sql, function (err, results) {
    if (err) {
      res.json({
        msg: err.toString(),
        code: 500,
      });
    } else {
      allCount = results[0]["COUNT(*)"];

  console.log(allCount);

      back(allCount);
    }
  });

  function back(allCount) {
    db.query(sql2, function (err, results) {
      if (err) {
        res.json({
          msg: err.toString(),
          code: 500,
        });
      } else {
        var allPage = allCount / pageSize;
        var pageStr = allPage.toString();
        // 不能整除
        if (pageStr.indexOf(".") > 0) {
          allPage = parseInt(pageStr.split(".")[0]) + 1;
        }
        res.json({
          msg: "操作成功",
          status: "200",
          totalPages: allPage,
          data: results,
          total: allCount,
          currentPage: parseInt(pageNo),
        });
      }
    });
  }
};

const getWuCGTable = (req, res) => {
  let allCount;
  let pageNo = parseInt(req.body.pageNo);
  let pageSize = parseInt(req.body.pageSize);
  let sql = "SELECT COUNT(*) FROM Purchaser where isShow=0";
  let sql2 =
    "SELECT*FROM Purchaser where isShow=0 Order By id desc limit" +
    " " +
    (pageNo - 1) * pageSize +
    "," +
    pageNo * pageSize;
  db.query(sql, function (err, results) {
    if (err) {
      res.json({
        msg: err.toString(),
        code: 500,
      });
    } else {
      allCount = results[0]["COUNT(*)"];
      back(allCount);
    }
  });

  function back(allCount) {
    db.query(sql2, function (err, results) {
      if (err) {
        res.json({
          msg: err.toString(),
          code: 500,
        });
      } else {
        var allPage = allCount / pageSize;
        var pageStr = allPage.toString();
        // 不能整除
        if (pageStr.indexOf(".") > 0) {
          allPage = parseInt(pageStr.split(".")[0]) + 1;
        }
        res.json({
          msg: "操作成功",
          status: "200",
          totalPages: allPage,
          data: results,
          total: allCount,
          currentPage: parseInt(pageNo),
        });
      }
    });
  }
};




const getWuZiexport = (req, res) => {
  let sql = "SELECT * FROM form where isShow=0  Order By id desc";
  db.query(sql, function (err, results) {
    if (err) {
      res.json({
        msg: err.toString(),
        code: 500,
      });
    } else {
      //导出
      var conf = {};
      conf.name = "mysheet";
      conf.cols = [
        {
          caption: "身份类型",
          type: "string",
          beforeCellWrite: function (row, cellData) {
            return cellData.toUpperCase();
          },
          width: 30,
        },
        {
          caption: "公司名称",
          type: "string",
          beforeCellWrite: function (row, cellData) {
            return cellData.toUpperCase();
          },
          width: 30,
        },
        {
          caption: "时间",
          type: "string",
          beforeCellWrite: function (row, cellData) {
            return cellData.toUpperCase();
          },
          width: 30,
        },
      ];
   
      let arr=[];
      results.map((item,index)=>{
        let arr1=[];
        arr1.push(item.type);
        arr1.push(item.company);
        arr1.push(item.time);
          arr.push(arr1)
      })
      conf.rows =arr;
      var result = nodeExcel.execute(conf);
      res.setHeader("Content-Type", "application/vnd.openxmlformats");
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=" + encodeURIComponent("导出列表") + ".xlsx"
      );
      res.end(result, "binary");
    }
  });
};



const getWuGYExportExcel = (req, res) => {
  let sql = "SELECT * FROM supplier where isShow=0  Order By id desc";
  db.query(sql, function (err, results) {
    if (err) {
      res.json({
        msg: err.toString(),
        code: 500,
      });
    } else {
      //导出
      var conf = {};
      conf.name = "mysheet";
      conf.cols = [
        {
          caption: "身份类型",
          type: "string",
          beforeCellWrite: function (row, cellData) {
            return cellData.toUpperCase();
          },
          width: 30,
        },
        {
          caption: "公司名称",
          type: "string",
          beforeCellWrite: function (row, cellData) {
            return cellData.toUpperCase();
          },
          width: 30,
        },
        {
          caption: "住址",
          type: "string",
          beforeCellWrite: function (row, cellData) {
            return cellData.toUpperCase();
          },
          width: 30,
        },
        {
          caption: "姓名",
          type: "string",
          beforeCellWrite: function (row, cellData) {
            return cellData.toUpperCase();
          },
          width: 30,
        },
        {
          caption: "联系方式",
          type: "string",
          beforeCellWrite: function (row, cellData) {
            return cellData.toUpperCase();
          },
          width: 30,
        },
        {
          caption: "生产机型与台数",
          type: "string",
          beforeCellWrite: function (row, cellData) {
            return cellData.toUpperCase();
          },
          width: 100,
        },
        {
          caption: "库存量（标明过滤率）",
          type: "string",
          beforeCellWrite: function (row, cellData) {
            return cellData.toUpperCase();
          },
          width: 100,
        },
        {
          caption: "建议与帮助",
          type: "string",
          beforeCellWrite: function (row, cellData) {
            return cellData.toUpperCase();
          },
          width: 30,
        },
        {
          caption: "是否接受回访",
          type: "string",
          beforeCellWrite: function (row, cellData) {
            return cellData.toUpperCase();
          },
          width: 30,
        },
        {
          caption: "创建时间",
          type: "string",
          beforeCellWrite: function (row, cellData) {
            return cellData.toUpperCase();
          },
          width: 30,
        }
      ];
   
      let arr=[];
      results.map((item,index)=>{
        let arr1=[];
        arr1.push(item.type);
        arr1.push(item.company);
        arr1.push(item.detailaddress);
        arr1.push(item.name);
        arr1.push(item.phone);
        arr1.push(item.jixieDec);
        arr1.push(item.totalText);
        arr1.push(item.remark);
        arr1.push(item.isNeedBrief);
        arr1.push(item.time);
        arr.push(arr1)
      })
      conf.rows =arr;
      var result = nodeExcel.execute(conf);
      res.setHeader("Content-Type", "application/vnd.openxmlformats");
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=" + encodeURIComponent("导出列表") + ".xlsx"
      );
      res.end(result, "binary");
    }
  });
};
const getWuCGExportExcel = (req, res) => {
  let sql = "SELECT * FROM Purchaser where isShow=0  Order By id desc";
  db.query(sql, function (err, results) {
    if (err) {
      res.json({
        msg: err.toString(),
        code: 500,
      });
    } else {
      //导出
      var conf = {};
      conf.name = "mysheet";
      conf.cols = [
        {
          caption: "身份类型",
          type: "string",
          beforeCellWrite: function (row, cellData) {
            return cellData.toUpperCase();
          },
          width: 30,
        },
        {
          caption: "公司名称",
          type: "string",
          beforeCellWrite: function (row, cellData) {
            return cellData.toUpperCase();
          },
          width: 30,
        },
        {
          caption: "住址",
          type: "string",
          beforeCellWrite: function (row, cellData) {
            return cellData.toUpperCase();
          },
          width: 30,
        },
        {
          caption: "姓名",
          type: "string",
          beforeCellWrite: function (row, cellData) {
            return cellData.toUpperCase();
          },
          width: 30,
        },
        {
          caption: "联系方式",
          type: "string",
          beforeCellWrite: function (row, cellData) {
            return cellData.toUpperCase();
          },
          width: 30,
        },
        {
          caption: "需求产品",
          type: "string",
          beforeCellWrite: function (row, cellData) {
            return cellData.toUpperCase();
          },
          width: 100,
        },
        {
          caption: "建议与帮助",
          type: "string",
          beforeCellWrite: function (row, cellData) {
            return cellData.toUpperCase();
          },
          width: 30,
        },
        {
          caption: "是否接受回访",
          type: "string",
          beforeCellWrite: function (row, cellData) {
            return cellData.toUpperCase();
          },
          width: 30,
        },
        {
          caption: "创建时间",
          type: "string",
          beforeCellWrite: function (row, cellData) {
            return cellData.toUpperCase();
          },
          width: 30,
        }
      ];
   
      let arr=[];
      results.map((item,index)=>{
        let arr1=[];
        arr1.push(item.type);
        arr1.push(item.company);
        arr1.push(item.detailaddress);
        arr1.push(item.name);
        arr1.push(item.phone);
        arr1.push(item.totalText);
        arr1.push(item.remark);
        arr1.push(item.isNeedBrief);
        arr1.push(item.time);
        arr.push(arr1)
      })
      conf.rows =arr;
      var result = nodeExcel.execute(conf);
      res.setHeader("Content-Type", "application/vnd.openxmlformats");
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=" + encodeURIComponent("导出列表") + ".xlsx"
      );
      res.end(result, "binary");
    }
  });
};

/* 删除供应商 */
const deleteGyConfig = (req, res) => {
  let id = req.body.id;
  let sql = "UPDATE supplier  set isShow=? where id=?";
  let param = ["1", id];
  db.query(sql, param, function (err, results) {
    if (err) {
      res.json({
        msg:  err.toString(),
        code: 500,
      });
    } else {
      res.json({
        msg: "操作成功",
        status: "200"
      });
    }
  });
}

/* 删除采购商 */
const deleteCGConfig = (req, res) => {
  let id = req.body.id;
  console.log(id);


  let sql = "UPDATE Purchaser  set isShow=? where id=?";
  let param = ["1", id];
  db.query(sql, param, function (err, results) {
    if (err) {
      res.json({
        msg:  err.toString(),
        code: 500,
      });
    } else {
      res.json({
        msg: "操作成功",
        status: "200"
      });
    }
  });
}

module.exports = {
  getWuZiTable: getWuZiTable,
  getWuZiexport: getWuZiexport,
  getWuGYTable:getWuGYTable,
  getWuCGTable:getWuCGTable,
  getWuGYExportExcel:getWuGYExportExcel,
  getWuCGExportExcel:getWuCGExportExcel,
  deleteGyConfig:deleteGyConfig,
  deleteCGConfig:deleteCGConfig
};
