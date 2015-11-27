SMCalendar
==========
SMCalendar 日历，依赖Jquery，有问题请发邮件：sm0210@qq.com


##效果
![](https://github.com/sm0210/SMCalendar/blob/JAVASCRIPT/SMCalendar.png "SMCalendar")


![](https://github.com/sm0210/SMCalendar/blob/JAVASCRIPT/SMCalendar0.2.png "SMCalendar")


##实例化SMCalendar日历对象一，简单实例化无需任何参数
var SMCalendar=$("#SMCalendar").initSMCalendar();//初始化日历插件，并获取日历对象


##实例化SMCalendar日历对象二，传入日期数据
//数据
var data=[{'title':'今天标题1','date':'2015-11-19'},{'title':'今天标题2','date':'2015-11-19'},{'title':'标题2','date':'2015-11-20'},{'title':'标题3','date':'2015-12-28'}];
//初始化日历插件，并获取日历对象
var SMCalendar=$("#SMCalendar").initSMCalendar({dataList:data});


##实例化SMCalendar日历对象三，传入日期数据并监听自定义事件
//数据
var data=[{'title':'今天标题1','date':'2015-11-19'},{'title':'今天标题2','date':'2015-11-19'},{'title':'标题2','date':'2015-11-20'},{'title':'标题3','date':'2015-12-28'}];

//初始化日历插件，并获取日历对象	   
var SMCalendar=$("#SMCalendar").initSMCalendar({dataList:data,onClick:smCalendarClick});
//自定义事件
function smCalendarClick(data){
	alert("当前日期数据有："+data.length+" 条!");
}




###如果您觉得此文有帮助，可以打赏点钱给我支付宝sm0210@qq.com ，或扫描二维码
![](https://github.com/sm0210/SMCalendar/blob/master/sm0210%40qq.com.jpg "sm0210@qq.com")

