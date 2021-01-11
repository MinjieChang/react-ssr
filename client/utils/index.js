import React from 'react'
import { matchPath } from 'react-router-dom'
/**
 * 以递归的方式展平react router数组
 */
export const flattenRoutes = arr =>
  arr.reduce(function(prev, item) {
    prev.push(item);
    return prev.concat(
      Array.isArray(item.routes) ? flattenRoutes(item.routes) : []
    );
  }, []);


export const getBreadcrumbs = ({ flattenRoutes, location }) => {
  // 初始化匹配数组match
  let matches = [];
  location.pathname
    // 取得路径名，然后将路径分割成每一路由部分.
    .split('?')[0]
    .split('/')
    // 对每一部分执行一次调用`getBreadcrumb()`的reduce.
    .reduce((prev, curSection) => {
      // 将最后一个路由部分与当前部分合并，比如当路径为 `/x/xx/xxx` 时，pathSection分别检查 `/x` `/x/xx` `/x/xx/xxx` 的匹配，并分别生成面包屑
      const pathSection = `${prev}/${curSection}`;
      const breadcrumb = getBreadcrumb({
        flattenRoutes,
        curSection,
        pathSection,
      });

      // 将面包屑导入到matches数组中
      matches.push(breadcrumb);

      // 传递给下一次reduce的路径部分
      return pathSection;
    });
    // return [home, ...matches]
    if(location.pathname === '/') {
      return matches;
    } else {
      let home = getBreadcrumb({flattenRoutes, curSection: '/', pathSection: '/'})
      return [home, ...matches]
    }
};

const getBreadcrumb = ({ flattenRoutes, curSection, pathSection }) => {
  const matchRoute = flattenRoutes.find(ele => {
    const { breadcrumb, path } = ele;
    if (!breadcrumb || !path) {
      throw new Error(
        'Router中的每一个route必须包含 `path` 以及 `breadcrumb` 属性'
      );
    }
    // 查找是否有匹配
    /**
     * 实际上 matchPath 做的是这个事情
     * return pathSection === path
     */
    return matchPath(pathSection, { path, exact: true });
  });
  // 返回breadcrumb的值，没有就返回原匹配子路径名
  if (matchRoute) {
    return render({
      content: matchRoute.breadcrumb || curSection,
      path: matchRoute.path,
    });
  }

  // 对于routes表中不存在的路径
  // 根目录默认名称为首页.
  return render({
    content: pathSection === '/' ? '首页' : curSection,
    path: pathSection,
  });
};

const render = ({ content, path }) => {
  const componentProps = { path };
  if (typeof content === 'function') {
    return <content {...componentProps} />;
  }
  return <span {...componentProps}>{content}</span>;
};