const hitokoto = document.querySelector("#hitokoto");
const spanTime = document.querySelector("#span_time");

var typed = new Typed(".blogtitle", {
    strings: ['Loading...', '今天是元气满满的一天'],
    startDelay: 300,
    typeSpeed: 100,
    loop: true,
    backSpeed: 50,
    showCursor: true
})


// 夜间模式
function dark() {
    let element = document.body
    element.classList.toggle("dark-mode");
}

// 一言
function yiyan() {
    let promise = fetch('https://v1.hitokoto.cn/').then(res => {
        if (res.status === 200) {
            return res.json();
        } else {
            return {};
        }
    })
    promise = promise.then(data => {
        hitokoto.innerText = data.hitokoto;
    })
}

// 显示天时分秒数
function show_time() {
    window.setTimeout("show_time()", 1000);
    let time_end = new Date("2022/07/28 13:00:00"); // 设定开始时间
    let time_now = new Date();  // 获取当前时间
    let time_distance = time_now.getTime() - time_end.getTime() ;  // 当前时间减去开始时间
    let int_day, int_hour, int_minute, int_second;
    if(time_distance >= 0) {
        // 第一种方式
        // int_day = Math.floor(time_distance / 86400000); // 一天的毫秒数
        // time_distance -= int_day * 86400000;
        // int_hour = Math.floor(time_distance / 3600000); // 小时毫秒数
        // time_distance -= int_hour * 3600000;
        // int_minute = Math.floor(time_distance / 60000); // 分钟毫秒数
        // time_distance -= int_minute * 60000;
        // int_second = Math.floor(time_distance / 1000); // 毫秒数

        // 第二种方式（推荐）
        int_day = parseInt(time_distance / (1000 * 60 * 60 * 24));
        int_hour = parseInt(time_distance % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
        int_minute = parseInt(time_distance % (1000 * 60 * 60) / (1000 * 60));
        int_second = parseInt(time_distance % (1000 * 60) / 1000);

        if(int_hour < 10) {
            int_hour = '0' + int_hour;
        }
        if(int_minute < 10) {
            int_minute = '0' + int_minute;
        }
        if(int_second < 10) {
            int_second = '0' + int_second;
        }
        spanTime.innerHTML = 
            `<font>${int_day}</font> 天
             <font>${int_hour}</font> 时
             <font>${int_minute}</font> 分
             <font>${int_second}</font> 秒
            `;
    } else {
        int_day = '';
        int_hour = '';
        int_minute = '';
        int_second = '';
    }
}

// 显示URL
function page_url() {
    swal({
        title: "URL",
        text: window.location.href,
    })
}

// 复制内容
function copy(data) {
    let url = document.location.href;
    let input = document.createElement("input");
    input.setAttribute("readonly","readonly"); // 设置初始化输入框只读
    input.value = data != null ? data : url;
    document.body.appendChild(input);
    input.select();
    document.execCommand("Copy");
    document.body.removeChild(input);
    swal("复制成功！");
}

// 显示邮箱
function email() {
    swal({
        title: "E-mail",
        text: "783341822@qq.com",
        buttons: ["复制", true]
    }).then(res => {
        if(res) {

        } else {
            copy("783341822@qq.com")
        }
    })
}

// 问候
function say() {
    let now = new Date();
    let hour = now.getHours();
    if(hour > 0) {
        if(hour < 9) {
            swal({
                title: "凌晨了！",
                text: "注意休息~",
                icon: "info"
            })
        } else if(hour > 6) {
            if(hour < 9) {
                swal({
                    title: "早上好！",
                    text: "新的一天也要活力满满哦~",
                    icon: "info"
                })
            }
        } else if(hour > 21) {
            if(hour < 24) {
                swal({
                    title: "晚上好",
                    text: "开启夜间模式可以让页面不那么刺眼哦~",
                    icon: "info",
                    buttons: ["夜间模式", true]
                }).then(res => {
                    if(res) {

                    } else {
                        dark();
                    }
                })
            }
        }
    }
}

// 浏览器标题
var orignTitle = document.title;
var titleTime;
document.addEventListener("visibilitychange", () => {
    if(document.hidden) {
        document.title = "╭(°A°`)╮ 快回来！";
        clearTimeout(titleTime);
    } else {
        document.title = "(ฅ>ω<*ฅ) 总算回来啦~";
        titleTime = setTimeout(() => {
            document.title = orignTitle;
        }, 1000);
    }
}) 

yiyan();
show_time();