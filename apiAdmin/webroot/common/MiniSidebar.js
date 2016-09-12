import React from 'react'

const MiniSidebar = React.createClass({
    minimalize(){
        $("body").toggleClass("mini-navbar");

        if (!$('body').hasClass('mini-navbar') || $('body').hasClass('body-small')) {
            $('#side-menu').hide();
            $("#header .navbar-brand").text("云仓管理");
            setTimeout(
                function () {
                    $('#side-menu').fadeIn(500);
                }, 100);
        } else if ($('body').hasClass('fixed-sidebar')){
            $('#side-menu').hide();
            setTimeout(
                function () {
                    $('#side-menu').fadeIn(500);
                }, 300);
        } else {
            $("#header .navbar-brand").text("云仓");
            $('#side-menu').removeAttr('style');
        }
    },
    render(){
        return (
            <span>
                <a onClick={this.minimalize} className="navbar-minimalize minimalize-styl-2 btn btn-primary ">
                    <i className="fa fa-bars"></i>
                </a>
            </span>
        )
    }
})

export default MiniSidebar;