// 理想中的面包屑组件
// 展示格式为 a / b / c1 并都附上链接
import React from 'react'
import { Link } from 'react-router-dom'

const BreadcrumbsComponent = ({ breadcrumbs, location: { pathname } }) => (
  <div>
    {breadcrumbs.map((breadcrumb, index) => (
      <span key={breadcrumb.props.path}>
        {pathname === breadcrumb.props.path ? (
          <span>{breadcrumb}</span>
        ) : (
          <Link to={breadcrumb.props.path}>{breadcrumb}</Link>
        )}
        {index < breadcrumbs.length - 1 && <i> / </i>}
      </span>
    ))}
  </div>
);

export default BreadcrumbsComponent