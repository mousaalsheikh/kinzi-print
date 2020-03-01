/*
kinziPrint v1.3.1
@author Mousa Alsheikh

Licensed under the MIT licence:
http://www.opensource.org/licenses/mit-license.php

(c) Mousa Alsheikh 2019 - 2022   
*/
(function ($) {
    $.fn.kinziPrint = function (options) {
        var settings = $.extend({
            importCSS: true,
            importStyles: false,
            loadCSS: '',
            printContainer: true,
            header: null,
            footer: null,
            printDelay: 500,
            debug: false,
            base: ''
        }, options);

        let printHeader = '';
        let printBody = '';

        if (settings.importCSS) {
            $('link[rel="stylesheet"]').each(function () {
                printHeader += '<link href="' + $(this).attr('href') + '" rel="stylesheet" />';
            });
        }
        if (settings.importStyles) {
            $('style[type="text/css"]').each(function () {
                printHeader += '<style type="text/css">';
                printHeader += $(this).text();
                printHeader += '</style>';
            });
        }

        if (settings.loadCSS) {
            if ($.isArray(settings.loadCSS)) {
                for (var i = 0; i < settings.loadCSS.length; i++) {
                    printHeader += '<link href="' + settings.loadCSS[i] + '" rel="stylesheet" />';
                }
            } else {
                printHeader += '<link href="' + settings.loadCSS + '" rel="stylesheet" />';
            }
        }

        printBody += '<table class="kinzi-print-table" style="width:100%;" cellpadding="0" cellspacing="0">';

        printBody += '<thead class="kinzi-print-header" style="display: table-header-group !important;">';
        printBody += '<tr>';
        printBody += '<td>';
        if (settings.header) {
            printBody += settings.header;
        }
        printBody += '<span style=" font-size: 0 !important; line-height: 0 !important;">&nbsp;</span>';
        printBody += '</td>';
        printBody += '</tr>';
        printBody += '</thead>';

        printBody += '<tfoot class="kinzi-print-footer" style="display: table-footer-group !important;">';
        printBody += '<tr>';
        printBody += '<td>';
        if (settings.footer) {
            printBody += settings.footer;
        }
        printBody += '<span style=" font-size: 0 !important; line-height: 0 !important;">&nbsp;</span>';
        printBody += '</td>';
        printBody += '</tr>';
        printBody += '</tfoot>';

        printBody += '<tbody class="kinzi-print-body" style="display: table-row-group !important;">';
        printBody += '<tr>';
        printBody += '<td>';
        printBody += '<div class="kinzi-print-wrapper">';
        if (settings.printContainer) {
            printBody += $(this)[0].outerHTML;
        } else {
            printBody += $(this).html();
        }
        printBody += '</div>';
        printBody += '<div class="page-break" style="font-size: 0 !important; line-height: 0 !important; page-break-before: always !important;">&nbsp;</div>';
        printBody += '</td>';
        printBody += '</tr>';
        printBody += '</tbody>';

        printBody += '</table>';

        var debugStyle = '';
        if (!settings.debug) {
            debugStyle = 'display:none !important;';
        }

        $('iframe[name="kinziprint"]').remove();
        $('<iframe>', {
            name: 'kinziprint',
            class: 'kinzi-print',
            style: debugStyle
        })
            .appendTo('body')
            .contents().find('body')
            .append(printBody)
            .css({ 'margin': '0' });

        if (settings.base) {
            printHeader = '<base href="' + settings.base + '" />' + printHeader;
        }
        $(window.frames['kinziprint'].document).find('head').html(printHeader);

        setTimeout(function () {           
            window.frames['kinziprint'].focus();
            window.frames['kinziprint'].print();
        }, settings.printDelay);
        return false;
    };
}(jQuery));