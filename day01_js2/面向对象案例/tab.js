var that;
class Tab {
    constructor(id){
        // 获取元素
        that = this
        this.main = document.querySelector(id)
        this.add = this.main.querySelector('.tabadd')
        this.ul = this.main.querySelector('.fisrstnav ul')
        this.section = this.main.querySelector('.tabscon')
        this.init()
    }
    init(){
        this.updateNode()
        // init 初始化操作让相关的元素绑定事件
        this.add.onclick = this.addTab
        for(let i = 0 ; i < this.lis.length ; i++){
            this.lis[i].index = i;
            this.lis[i].onclick = this.toggleTab
            this.remove[i].onclick = this.removeTab
            this.spans[i].ondblclick = this.editTab
            this.sections[i].ondblclick = this.editTab
        }
    }
    // 获取所有li 和section
    updateNode(){
        this.lis = this.main.querySelectorAll('li')
        this.sections = this.main.querySelectorAll('section')
        this.remove = this.main.querySelectorAll('.icon-guanbi')
        this.spans = this.main.querySelectorAll('.fisrstnav li span:first-child')
    }
    // 清除操作
    clearClass(){
        for(let i = 0 ; i < this.lis.length ; i++){
            this.lis[i].className = ''
            this.sections[i].className = ''
        }
    }
    // 切换功能
    toggleTab(){
        that.clearClass()
        this.className = 'liactive'
        that.sections[this.index].className = 'conactive'
    }
    // 添加功能
    addTab(){
        that.clearClass()
        // 以前的做法 动态创建createElement，再innerHTML赋值再用appendChild追加到父元素里面
        // 用一个更高级的插入新标签的方法insertAdjacentHTML 第一个参数是指定插入的位置，第二个是插入的值(它可以自动的解析字符串)
        // 1.创建新的选项卡li 和内容section
        let li = '<li class="liactive"><span>测试1</span><span class="iconfont icon-guanbi"></span></li>'
        let section = '<section class="conactive">测试1</section>'
        // 2.把创建的元素追加到父元素中
        that.ul.insertAdjacentHTML('beforeend',li)
        that.section.insertAdjacentHTML('beforeend',section)
        that.init()
    }
    // 删除功能
    removeTab(e){
        // 阻止冒泡 防止触发li 的切换事件
        e.stopPropagation()
        var index = this.parentNode.index
        // 根据索引号删除对应的li 和section
        that.lis[index].remove()
        that.sections[index].remove()
        that.init()
        // 当我们删除的并非选中状态的li，原来选中状态li 保持不变
        if(document.querySelector('.liactive')) return;
        // 当我们删除了了选中状态的这个li 的时候让他前一个li 处于选定状态
        index--
        // 手动调用我们的点击事件 不需要鼠标触发
        that.lis[index] && that.lis[index].click()
    }
    // 修改功能
    editTab(){
        var str = this.innerHTML
        //  双击禁止选定文字
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
        this.innerHTML = '<input type="text" />'
        var input = this.children[0]
        input.value = str
        input.select()
        input.onblur = function(){
            this.parentNode.innerHTML = this.value
        }
        // 按下回车也可以把文本框的值给sapn
        input.onkeyup = function(e){
            if(e.keyCode === 13){
                // 手动调用鼠标失去焦点事件
                this.blur()  
            }
        }
    }
}
new Tab('#tab')