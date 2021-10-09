Page({
    global : {
        timer : null ,
        isRand : false
    },
    data: {
      dice : ['first','second','third','fourth','fifth','sixth'],
      buttonType : 'primary',
      buttonValue : '博饼！',
      isShow:'hidden',
      num1 : 0,
      num2 : 0,
      num3 : 0,
      num4 : 0,
      num5 : 0,
      num6 : 0,
      ans : 0,
    },
    
    shakeClick: function () { 
      let me = this;
      this.global.isRand = !this.global.isRand;
      if ( this.global.isRand ) {
        this.global.timer = setInterval(function (){
          let num11 = Math.floor(Math.random()*6);
          let num22 = Math.floor(Math.random()*6);
          let num33 = Math.floor(Math.random()*6);
          let num44 = Math.floor(Math.random()*6);
          let num55 = Math.floor(Math.random()*6);
          let num66 = Math.floor(Math.random()*6);
          me.setData({num1 : num11});
          me.setData({num2 : num22});
          me.setData({num3 : num33});
          me.setData({num4 : num44});
          me.setData({num5 : num55});
          me.setData({num6 : num66});
          let arr=new Array(num11+1,num22+1,num33+1,num44+1,num55+1,num66+1);
          let sum=0;
          arr.sort();
          // 判断
          if(arr[1]==6&&arr[5]==6){
            if(arr[0]==6){
              me.setData({ans:"六抔黑"});
            }
            else me.setData({ans:"状元-五子登科"})
          }
          else if(arr[2]==4&&arr[5]==4){
            if(arr[0]==4)me.setData({ans:"状元-六抔红"});
            else if(arr[1]==4)me.setData({ans:"状元-五王"});
            else if(arr[0]==1&&arr[1]==1)me.setData({ans:"状元插金花"});
            else me.setData({ans:"状元"});
          }
          else if(arr[0]==1&&arr[1]==2&&arr[2]==3&&arr[4]==5&&arr[5]==6)
            me.setData({ans:"榜眼-对堂"});
            else{
              for(var i=0;i<=5;i++){
                if(arr[i]==2)
                  sum+=arr[i];
              }
              if(sum==8)me.setData({ans:"四进"});
              else{
                sum=0;
                for(var i=0;i<=5;i++){
                  if(arr[i]==4)sum+=arr[i];
                }
                if(sum==12){
                  me.setData({ans:"三红"});
                }
                else if(sum==8){
                  me.setData({ans:"二举"});
                }
                else if(sum==4){
                  me.setData({ans:"一秀"});
                }
                else me.setData({ans:"再接再厉"});
              }
            }
        },50);
      } else {
        clearInterval(this.global.timer);
      }
      this.setData({
        dice: this.data.dice, 
        buttonType : (this.global.isRand) ? 'default' : 'primary',
        buttonValue : (this.global.isRand) ? '停止' : '博饼！',
        isShow: (this.global.isRand) ? 'hidden':'show',
      });
      
  
    },
}
  )
  