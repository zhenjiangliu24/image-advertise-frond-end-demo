/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function getElementByClassName(obj, cName)
{
    var arr = obj.getElementsByTagName('*');
    var result=[];
    for(var i = 0; i< arr.length; i++)
    {
        if(arr[i].className===cName)
        {
            result.push(arr[i]);
        }
    }
    return result;
}
window.onload = function()
{
    var mainFrame = document.getElementById('automatic');
    var prev_frame = getElementByClassName(mainFrame, 'prev_frame')[0];
    var prev = getElementByClassName(mainFrame, 'prev')[0];
    var prev_text = getElementByClassName(mainFrame, 'prev_text')[0];
    
    var next_frame = getElementByClassName(mainFrame, 'next_frame')[0];
    var next = getElementByClassName(mainFrame,'next')[0];
    var next_text = getElementByClassName(mainFrame, 'next_text')[0];
    
    var ul = mainFrame.getElementsByTagName('ul')[0];
    var aLi = ul.getElementsByTagName('li');
    var tempLi =[];
    var i = 0;
    for(i =0; i<aLi.length;i++)
    {
        tempLi[i]={};
        aLi[i].width=tempLi[i].width = aLi[i].getElementsByTagName('img')[0].offsetWidth;
        aLi[i].height=tempLi[i].height = aLi[i].getElementsByTagName('img')[0].offsetHeight;
        aLi[i].alpha=tempLi[i].alpha =0;
        aLi[i].z=tempLi[i].z =1;
    }

    tempLi[0].left=0; tempLi[0].top=-104;
    tempLi[1].left=0; tempLi[1].top=104;
    tempLi[2].left=50; tempLi[2].top=43;
    tempLi[3].left=145; tempLi[3].top=0;
    tempLi[4].left=410; tempLi[4].top=43;
    tempLi[5].left=750; tempLi[5].top=104;
    tempLi[6].left=750; tempLi[6].top=-104;
    tempLi[7].left=750; tempLi[7].top=-104;
    
    aLi[1].alpha = tempLi[1].alpha = 60;
    aLi[2].alpha = tempLi[2].alpha = 80;
    aLi[3].alpha = tempLi[3].alpha = 100;
    aLi[4].alpha = tempLi[4].alpha = 80;
    aLi[5].alpha = tempLi[5].alpha = 60;
    
    tempLi[1].z = 2;
    tempLi[2].z = 3;
    tempLi[3].z = 4;
    tempLi[4].z = 3;
    tempLi[5].z = 2;
    prev.onmouseover=function()
    {
        startMove(prev_text,{opacity:100, right:10});
        startMove(prev,{left: 10});
    };
    prev.onmouseout = function()
    {
        startMove(prev_text,{opacity:0, right:0});
        startMove(prev,{left:0});
    };
    next.onmouseover = function()
    {
        startMove(next_text,{opacity:100, left:10});
        startMove(next,{right:10});
    };
    next.onmouseout = function()
    {
        startMove(next_text,{opacity:0, left:0});
        startMove(next,{right:0});
    };
    prev_frame.onclick = function()
    {
        picMove(true);
    };
    next_frame.onclick = function()
    {
        picMove(false);
    };
    function picMove(bLeft)
    {
        if(bLeft)
        {
            tempLi.push(tempLi.shift());
        }else
        {
            tempLi.unshift(tempLi.pop());
        }
        for(i = 0; i< aLi.length;i++)
        {
            startMove(aLi[i],{left:tempLi[i].left,top:tempLi[i].top,width:tempLi[i].width, height:tempLi[i].height, opacity:tempLi[i].alpha,zIndex:tempLi[i].z});
            
            startMove(aLi[i].getElementsByTagName('img')[0],{width:tempLi[i].width, height:tempLi[i].height});
        }
    }
};
//get obj attribute attr
function getStyle(obj, attr)
{
    if (obj.currentStyle)
    {
        return obj.currentStyle[attr];
    }
    else
    {
        return getComputedStyle(obj, false)[attr];
    }
}
//move action
function startMove(obj, jason, fnEnd)
{
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var cur = 0;
        var finish = true;
        for (var attr in jason)
        {
            if (attr === 'opacity')
            {
                cur = Math.round(parseFloat(getStyle(obj, attr)) * 100);
            }else if(attr==='zIndex')
            {
                cur=parseFloat(getStyle(obj,attr));
            }
            else
            {
                cur = parseInt(getStyle(obj, attr));
            }

            var speed = (jason[attr] - cur) / 10;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

            if (cur !== jason[attr])
            {
                finish=false;
            }
            
            if (attr === 'opacity')
            {
                obj.style.filter = 'alpha(opacity:' + (cur + speed) + ')';
                obj.style.opacity = (cur + speed) / 100;
            }
            else if(attr==='zIndex')
            {
                obj.style.zIndex=cur+speed;
            }
            else
            {
                obj.style[attr] = cur + speed + 'px';
            }
            
        }
        if(finish)
        {
            clearInterval(obj.timer);
            if (fnEnd)
            {
                fnEnd();
            }
        }
    }, 30);
}