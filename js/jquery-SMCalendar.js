/*
	author:SM
	e-mail:sm0210@qq.com
	desc:SMCalendar日历插件JS
	version:SMCalendar 0.2
*/
(function($){
		 $.fn.initSMCalendar=function(options){
			var s = $.extend({}, defaults, options || {});//
			var SMCalendarObj=$(this)[0];
			if(!SMCalendarObj){
				return;
			}
			//ID
			var SMCalendarId=SMCalendarObj.id;
			var monthbegday=1;//日期开始
			var monthindex=1;//日期变量
			var htmlstr='';//html
			/**
				获取星期几[0-6]
			*/
			s.getSMCalendarDay = function(){
				return this.today.getDay();
			},
			/**
				获取年
			*/
			s.getSMCalendarYear = function(){
				return this.today.getFullYear();
			},
			/**
				获取月
			*/
			s.getSMCalendarMonth =function(){
				return this.today.getMonth();
			},
			/**
				返回当前月开始是星期几
			*/
			s.monthdayweekday = function(today){
				var ssdate=new Date(today.getFullYear(),today.getMonth(),monthbegday); 
				return ssdate.getDay()  			//返回星期几[0-6]
			},
			/**
				返回这个月剩余多少天
			*/
			s.monthendday = function(){
				var year = this.today.getFullYear();
				if (year < 2000) year += 1900; // Y2K fix
				var month = this.today.getMonth();
				var monarr = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);	
				// check for leap year
				if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)) monarr[1] = "29";
				return (monarr[month]);
			},
			/**
				判断是否超过总天数
			*/
			s.validateday = function(objnum){
				var objArr=[];
				if(objnum<=this.monthendday(this.today)){
					objArr[0]=objnum;
					objArr[1]=this.today.getFullYear()+"-"+(this.today.getMonth()+1)+"-"+objnum;
					return objArr;
				}
				return objArr;
			},
			/**
				比较日期是否相等
			*/
			s.compareDay = function(sdate,edate){
				if(Date.parse(sdate.replace(/\-/g,"/"))===Date.parse(edate.replace(/\-/g,"/"))){
					return true;
				}
				return false;
			},
			/**
			 * 根据日期获取获取数据
			 */
			s.getData = function(dateDay){
				var data=s.dataList;
				
				var dataArr=[];
				$.grep(data,function(n,i){
					if(s.compareDay(n.date,dateDay)){
						dataArr.push(n);
					}
				});
				return dataArr;
				
			},
			/**
			 * 获取dataList数据
			 */
			s.getDataList = function(){
				return s.dataList;
			},
			/**
				获取Heaer
			*/
			s.getHeader = function(){
				var htmlstr='<tr>';
				for(var i=0;i<=6;i++){
					htmlstr+='<td  align="center" height="10"  ';
					if(i==0 || i==6)
						htmlstr+=' style="color:#FEA740;" '
					htmlstr+=">"+this.weekabbrs[i];
					htmlstr+='</td>';
				}
				htmlstr+='</tr>';
				return htmlstr;
			},
			/**
				当前天日期样式
			*/
			s.validateCss =  function(defaultDate,dateDay){
				if(s.compareDay(defaultDate,dateDay)){
					return " toDayCalendar";
				}
				return "";
			},
			/**
				获取日期消息样式
			*/
			s.getMarkCalendar = function(dateDay){
				var data=s.dataList;
				var maskFalg=false;
				$.grep(data,function(n,i){
					if(s.compareDay(n.date,dateDay)){
						maskFalg=true;
						return maskFalg;
					}
				});
				//
				if(maskFalg){
					return " dateClass";
				}
				return "";
			},
			//渲染日历
			s.addSMCalendar = function(){
				var htmlstr='';
				var monthindex=0;	
				//列头
				htmlstr+='<table class="SMCalendar" id="'+SMCalendarId+'" border="0"  cellpadding="0" cellspacing="0" align="center"> ';
				htmlstr+=s.getHeader();
				htmlstr+='<tbody id="SMCalendarContent">';
				var thatDay=s.monthdayweekday(this.today);
				var countDay=Math.ceil((s.monthendday(this.today)-(this.todoayArr[s.monthdayweekday(this.today)]))/7)+1;
				for(var i=1;i<=countDay;i++){
					if(monthindex<=s.monthendday(this.today)){//总的天数
						htmlstr+='<tr>';
						for(var j=0;j<=6;j++){							
							htmlstr+='<td align="center" ';
							if(i==1){//首行
								if(j>=thatDay){
									++monthindex;
									var dayStr=s.validateday(monthindex)[0] || '';
									var dayId=s.validateday(monthindex)[1] || '';
									var dateCss=s.validateCss(this.dayDate,dayId);
									var markCalendar=s.getMarkCalendar(dayId);

									htmlstr+=' class="'+dateCss+' '+markCalendar+'" id="'+dayId+'" cellday="'+dayId+'" valign="middle" ><span>'+dayStr+'</span>';
								}else{
									htmlstr+=' ><span></span>';
								}
								htmlstr+='</td> ';
							}else{//不是首行
								++monthindex;
								var dayStr=s.validateday(monthindex)[0] || '';
								var dayId=s.validateday(monthindex)[1] || '';
								var dateCss=s.validateCss(this.dayDate,dayId);
								var markCalendar=s.getMarkCalendar(dayId);
								
								htmlstr+=' id="'+dayId+'" cellday="'+dayId+'" class="'+dateCss+' '+markCalendar+'" valign="middle"><span>'+dayStr+'</span></td>';
									
							}//end if
						}//end for
						htmlstr+='</tr>';
						
					}//end if
				
				}//end for
				
				htmlstr+='</tbody>';
				htmlstr+='</table>';
				//end 日历
				return htmlstr;
			},
			//默认日历初始化方法
			s.newSMCalendar = function(){
				$("#"+SMCalendarId).html(s.addSMCalendar());
				
				//事件抛出
				//获取日历的点击事件
				$("#"+SMCalendarId+" .dateClass").click(function(){
					//获取点击日期
					var dayStr=this.attributes.cellday? this.attributes.cellday.value : null;
					if(dayStr){
						//get Data
						var data=s.getData(dayStr);
						//如果click是对象
						if(typeof s.onClick === "function") {
							//抛出事件
							s.onClick.call(this, data);
						}
					}
				});
				
				
			},
			//下一月
			s.getNextMonth = function(yearStr,monthStr){
				if(monthStr=="11")//下一年
				{	yearStr=yearStr+1;
					monthStr=-1;
				}
				this.today = new Date(yearStr,Number(monthStr+1),monthbegday);
				s.monthdayweekday(this.today);
				this.monthday=(this.today.getMonth()+1);//当前月
				s.monthendday(this.today);
				//s.newSMCalendar();
				
			},
			//上一月
			s.getPrveMonth = function(yearStr,monthStr){
				if(monthStr=="0")//上一年
				{	yearStr=yearStr-1;
					monthStr=12;
				}
				this.today = new Date(yearStr,Number(monthStr-1),monthbegday);
				s.monthdayweekday(this.today);
				this.monthday=(this.today.getMonth()+1);//当前月
				s.monthendday(this.today);
				//s.newSMCalendar();
			},
			/**
			 * 重新加载
			 */
			s.reload = function(){
				s.newSMCalendar();
			},
			/**
			 设置数据
			*/
			s.setDataList =  function(data){
				this.dataList=data
			}
			//提供日历方法，可扩展
			
			//渲染
			s.newSMCalendar();
			return s;
		 };	
		//初始化参
		var defaults ={
			//日期工具栏
			weekabbrs : ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT' ],
			//weekabbrs : [ '日', '一', '二', '三', '四', '五', '六' ],
			//一周
			todoayArr : [7,6,5,4,3,2,1],
			//当前日期
			today : new Date(),
			//当前月
			monthday : (new Date().getMonth()+1),
			//今天
			dayDate : (new Date().getFullYear()+'-'+(new Date().getMonth()+1)+"-"+new Date().getDate()),
			//dataList
			dataList : []
		};
		
})(jQuery);