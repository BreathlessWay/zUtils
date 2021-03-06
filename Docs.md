# zUtils

> 一个常用工具函数的集合

[离线存储方案 localforage](https://localforage.docschina.org/#localforage)

[IntersectionObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver)

[MutationObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver)

[page-lifecycle](https://github.com/GoogleChromeLabs/page-lifecycle)

# 错误收集

1. try/catch：能捕获常规运行时错误，语法错误和异步错误不行
2. window.onerror：能捕获常规运行时同步/异步错误，语法错误、接口请求、资源请求错误不能捕获
3. window.addEventListener：能捕获资源加载错误，new Image错误，不能捕获
4. unhandledrejection：全局监听Uncaught Promise Error
5. Vue错误：由于Vue会捕获所有Vue单文件组件或者Vue.extend继承的代码，所以在Vue里面出现的错误，并不会直接被window.onerror捕获，而是会抛给Vue.config.errorHandler
6. React错误：通过componentDidCatch，声明一个错误边界的组件，不会捕捉：React事件处理，异步代码，error boundaries自己抛出的错误。
7. 一般情况，如果出现 Script error 这样的错误，基本上可以确定是出现了跨域问题。通过以下两种方法能给予解决。
   - 后端配置Access-Control-Allow-Origin、前端script加crossorigin。
   - 如果不能修改服务端的请求头，可以考虑通过使用 try/catch 绕过，将错误抛出。
8. 利用webpack的hidden-source-map构建。与 source-map 相比少了末尾的注释，但 output 目录下的 .map 没有少。线上环境避免source-map泄露

> BrowsersList
```
> 5%: 基于全球使用率统计而选择的浏览器版本范围。>=,<,<=同样适用。
> 5% in US : 同上，只是使用地区变为美国。支持两个字母的国家码来指定地区。
> 5% in alt-AS : 同上，只是使用地区变为亚洲所有国家。这里列举了所有的地区码。
> 5% in my stats : 使用定制的浏览器统计数据。
cover 99.5% : 使用率总和为99.5%的浏览器版本，前提是浏览器提供了使用覆盖率。
cover 99.5% in US : 同上，只是限制了地域，支持两个字母的国家码。
cover 99.5% in my stats :使用定制的浏览器统计数据。
maintained node versions :所有还被 node 基金会维护的 node 版本。
node 10 and node 10.4 : 最新的 node 10.x.x 或者10.4.x 版本。
current node :当前被 browserslist 使用的 node 版本。
extends browserslist-config-mycompany :来自browserslist-config-mycompany包的查询设置
ie 6-8 : 选择一个浏览器的版本范围。
Firefox > 20 : 版本高于20的所有火狐浏览器版本。>=,<,<=同样适用。
ios 7 :ios 7自带的浏览器。
Firefox ESR :最新的火狐 ESR（长期支持版） 版本的浏览器。
unreleased versions or unreleased Chrome versions : alpha 和 beta 版本。
last 2 major versions or last 2 ios major versions :最近的两个发行版，包括所有的次版本号和补丁版本号变更的浏览器版本。
since 2015 or last 2 years :自某个时间以来更新的版本（也可以写的更具体since 2015-03或者since 2015-03-10）
dead :通过last 2 versions筛选的浏览器版本中，全球使用率低于0.5%并且官方声明不在维护或者事实上已经两年没有再更新的版本。目前符合条件的有 IE10,IE_Mob 10,BlackBerry 10,BlackBerry 7,OperaMobile 12.1。
last 2 versions :每个浏览器最近的两个版本。
last 2 Chrome versions :chrome 浏览器最近的两个版本。
defaults :默认配置> 0.5%, last 2 versions, Firefox ESR, not dead。
not ie <= 8 : 浏览器范围的取反。
可以添加not在任和查询条件前面，表示取反
```
