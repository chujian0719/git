import React from 'react'
import {Link} from 'react-router'

const BreadCrumb = React.createClass({
    render(){
        var {crumbs,title} = this.props;
        return (
            <div className="row wrapper border-bottom white-bg page-heading">
                <div className="col-lg-10">
                    <h2>{title}</h2>
                    <ol className="breadcrumb">
                        {
                            crumbs.map((crumb,i) => {
                                var link = <Link to={crumb.url}>{crumb.name}</Link>;
                                if(i == (crumbs.length-1)){
                                    link = <strong>{crumb.name}</strong>
                                };
                                return (
                                    <li key={i+i} className={i == (crumbs.length-1) ? "active": ""}>
                                        {link}
                                    </li>
                                )
                            })
                        }
                    </ol>
                </div>
            </div>
        )
    }
})

const IBoxTool = React.createClass({
    render(){
        var {children,title} = this.props;
        return (
            <div className="ibox float-e-margins">
                <div className="ibox-title">
                    <h5>{title}</h5> <span className="label label-primary">IN+</span>
                    <div className="ibox-tools dropdown">
                        <a onClick={this.showhide} > <i className="fa fa-chevron-up"></i></a>
                        <a className="dropdown-toggle">
                            <i className="fa fa-wrench"></i>
                        </a>
                        <ul className="dropdown-menu dropdown-user">
                            <li><a href>Config option 1</a>
                            </li>
                            <li><a href>Config option 2</a>
                            </li>
                        </ul>
                        <a onClick={this.closebox} ><i className="fa fa-times"></i></a>
                    </div>
                </div>
                <div className="ibox-content clearfix">
                    {children}
                </div>
            </div>
        )
    },
    showhide(event){
        var $element = $(event.currentTarget);
        var ibox = $element.closest("div.ibox");
        var icon = $element.find('i:first');
        var content = ibox.find('div.ibox-content');

        content.slideToggle(200);
        // Toggle icon from up to down
        icon.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
        ibox.toggleClass('').toggleClass('border-bottom');
        setTimeout(function(){
            ibox.resize();
            ibox.find('[id^=map-]').resize();
        },50)
    },
    closebox(event){
        var ibox = $(event.currentTarget).closest("div.ibox");
        ibox.remove();
    }
})
export {
    BreadCrumb,
    IBoxTool
}