
'use strict';

// 原始图片链接（[惊喜]）
const originalSrc = 'https://pic1.zhimg.com/v2-5c9b7521eb16507c9d2f747f3a32a813.png';

// 替换后的图片链接（[可怜]）
const replacementSrc = 'https://picx.zhimg.com/v2-efcc278139ad97608f4829fefaa3e068_xl.jpg';

// 替换单个元素的图片
function replaceImage(imgElement) {
    if (imgElement.src === originalSrc) {
        imgElement.src = replacementSrc;
    }
}

// 批量替换页面中所有匹配的表情
function replaceAllStickers() {
    const images = document.querySelectorAll('img.sticker');
    images.forEach(replaceImage);
}

// 使用 MutationObserver 监听动态内容（如评论、回答加载）
const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if (mutation.type === 'childList') {
            mutation.addedNodes.forEach(node => {
                if (node.nodeType === 1) { // 元素节点
                    if (node.tagName === 'IMG' && node.classList.contains('sticker')) {
                        replaceImage(node);
                    } else {
                        const imgs = node.querySelectorAll && node.querySelectorAll('img.sticker');
                        if (imgs) {
                            imgs.forEach(replaceImage);
                        }
                    }
                }
            });
        }
    });
});

// 初始替换
replaceAllStickers();

// 开始监听 DOM 变化
observer.observe(document.body, {
    childList: true,
    subtree: true
});