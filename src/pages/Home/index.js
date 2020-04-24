import React, {useState, useEffect} from 'react';
import "style/markdown.scss"

import "./Home.scss";

export default function () {  
    return (
        <div className="home-wrap">
            <div className="avatar">
                <div className="img"></div>
            </div>
            <h3>Kuang Dan</h3>
            <h6>Coder</h6>
            <button>
                <a href="https://juejin.im/user/5ab45518f265da23914809c5/posts"><i className="fab fa-github"></i></a>
            </button>
            <button>
                <a href="https://www.instagram.com/danakuang/"><i className="fab fa-instagram"></i></a>
            </button>
            <button>
                <a href="https://twitter.com/kuang51821034"><i className="fab fa-twitter"></i></a>
            </button>
            <div className="intro">
                <p>
                {
                    `
                        前端开发经验4年+，非计算机相关专业出身🐱，一直学文科，然而在做新闻的道路上为前端所着迷，转而走向技术开发的道路。曾拿到蚂蚁金服的P6 offer，因时机不凑巧所以没去。
                    `
                }
                </p>

                <p>
                {
                    `
                        转眼做开发的年限已远超过做新闻的时间。在目前这个阶段，非常想参与打造很厉害的产品，而不仅仅是完成需求～ 因而希望能够加入很棒的团队，和有趣又厉害的同学们一起并肩作战，打造好的产品，在自己的前端生涯中尽可能留下一些比较厉害的痕迹💪。这是我现阶段非常非常非常(三连)希望能够实现的事情😻。
                    `
                }
                </p>
                
                <p>
                {
                    `
                        如果您觉得我不错，欢迎联系我，通过点击github小图标（其实链的是掘金地址🤓️）可以找到我，期待ing！
                    `
                }
                </p>
            </div>
        </div>
    )
}