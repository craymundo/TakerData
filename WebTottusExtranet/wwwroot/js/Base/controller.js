$(document).ready(function () {

    var tituto = 'TakerData';

    $.fn.values = function () {
        var obj = this;
        var valor = obj.val();
        var resultado = valor == null ? "0" : valor;
        resultado = resultado == "" ? "0" : resultado;
        resultado = resultado == undefined ? "0" : resultado;
        return resultado;
    };

    $.fn.ReplaceTrim = function () {
        var obj = this;
        var valor = obj.val();
        var nuevo = valor.replace(/  +/g, ' ');
        return nuevo;
    };

    $.fn.ClearSelect = function () {
        var obj = this;
        $(obj).find('option').remove();
        $(obj).append('<option value="0" selected="selected"> -- Seleccione --</option>');
    };

    $.fn.ClearSelect2 = function () {
        var obj = this;
        $(obj).find('option').remove();
        $(obj).append('<option value="0" selected="selected"> -- Seleccione --</option>');
        $(obj).select2();
    };

    $.fn.CreateSelected2 = function (array, val, text, etiqueta, index) {
        var obj = this;
        $(obj).find('option').remove();
        if (index === undefined || index === false) {
            if (etiqueta === undefined)
                $(obj).append('<option value="0" selected="selected"> -- Seleccione --</option>');
            else
                $(obj).append('<option value="0" selected="selected"> -- ' + etiqueta + ' --</option>');
        }
        $.each(array, function (i, item) {
            $(obj).append('<option value="' + item[val] + '">' + item[text] + '</option>');
        });
        $(obj).select2();
    };

    $.fn.CreateSelected = function (array, val, text, etiqueta) {
        var obj = this;
        $(obj).find('option').remove();
        if (etiqueta === undefined)
            $(obj).append('<option value="0" selected="selected"> -- Seleccione --</option>');
        else
            $(obj).append('<option value="0" selected="selected"> -- ' + etiqueta + ' --</option>');

        $.each(array, function (i, item) {
            $(obj).append('<option value="' + item[val] + '">' + item[text] + '</option>');
        });
    };

    $.fn.CreateTouchSpinDecimal = function (decimales) {
        this.TouchSpin({
            min: 0,
            max: 1000000000,
            decimals: decimales,
            buttondown_class: 'btn btn-white',
            buttonup_class: 'btn btn-white',
            forcestepdivisibility: 'floor', // none | floor | round | ceil
        }).addClass("touchspin2").addClass("col-md-2");
    };

    $.fn.CreateDatepicker = function () {
        $(this).find(".input-group.date").datepicker({
            format: "dd/mm/yyyy",
            language: "it-IT",
            todayBtn: "linked",
            keyboardNavigation: false,
            forceParse: false,
            calendarWeeks: true,
            autoclose: true
        });
    };

    $.fn.ClearDataTable = function () {
        var name = "#" + this.get(0).id;
        if (this.DataTable.isDataTable(name)) {
            this.DataTable().clear();
            this.DataTable().destroy();
        }
    };

    $.fn.SetDataTableSimple = function () {
        this.DataTable({
            language: {
                emptyTable: "No se encontraron registros",
                zeroRecords: ""
            },
            paging: false,
            searching: false,
            ordering: false,
            info: false
        });
        this.removeClass("no-footer");
    };

    $.fn.SetDataTable = function (colm) {
        var name = "#" + this.get(0).id;
        if (this.DataTable.isDataTable(name)) {
            this.DataTable().clear();
            this.DataTable().destroy();
        }
        var maxcolumn = $.map(colm.columns, function (value, index) {
            if (value.title !== "Action") {
                return [index];
            }
        });
        this.DataTable({
            bSort: false,
            columns: colm.columns,
            dom: '<"html5buttons"B>lTfgitp',
            language: {
                emptyTable: "No se encontraron registros",
                zeroRecords: ""
            },
            lengthChange: false,
            ordering: false,
            info: false,
            scrollX: true,
            responsive: true,
            buttons: [
                {
                    extend: 'copy',
                    exportOptions:
                    {
                        columns: maxcolumn,
                        format: {
                            body: function (data, row, column, node) {
                                return data;
                            }
                        }
                    }
                },
                {
                    extend: 'excel',
                    title: 'Document',
                    exportOptions:
                    {
                        columns: maxcolumn,
                        format: {
                            body: function (data, row, column, node) {
                                return data;
                            }
                        }
                    }
                },
                {
                    extend: 'pdf',
                    title: 'Document',
                    exportOptions:
                    {
                        columns: maxcolumn,
                        format: {
                            body: function (data, row, column, node) {
                                return data;
                            }
                        }
                    }
                }
            ]
        });
    };

    $.fn.SetDataTableResponse = function (colm, response) {
        var name = "#" + this.get(0).id;
        if (this.DataTable.isDataTable(name)) {
            this.DataTable().clear();
            this.DataTable().destroy();
        }
        var maxcolumn = $.map(colm.columns, function (value, index) {
            if (value.title !== "Action") {
                return [index];
            }
        });
        this.DataTable({
            bSort: false,
           
            columns: colm.columns,
            dom: '<"html5buttons"B>lTfgitp',
            language: {
                emptyTable: "No se encontraron registros",
                zeroRecords: ""
            },
            lengthChange: false,
            ordering: false,
            info: false,
            scrollX: true,
            responsive: true,
            buttons: [
                {
                    extend: 'copy',
                    exportOptions:
                    {
                        columns: maxcolumn,
                        format: {
                            body: function (data, row, column, node) {
                                return data;
                            }
                        }
                    }
                },
                {
                    extend: 'excel',
                    title: 'Document',
                    exportOptions:
                    {
                        columns: maxcolumn,
                        format: {
                            body: function (data, row, column, node) {
                                return data;
                            }
                        }
                    }
                },
                {
                    extend: 'pdf',
                    title: 'Document',
                    exportOptions:
                    {
                        columns: maxcolumn,
                        format: {
                            body: function (data, row, column, node) {
                                return data;
                            }
                        }
                    }
                }
            ]
        }).rows.add(response).draw();
    };

    $.fn.SetDataTableResponseLoad = function (colm) {
        var name = "#" + this.get(0).id;
        if (this.DataTable.isDataTable(name)) {
            this.DataTable().clear();
            this.DataTable().destroy();
        }
        var maxcolumn = $.map(colm.columns, function (value, index) {
            if (value.title !== "Action") {
                return [index];
            }
        });
        this.DataTable({
            bSort: false,
            bFilter: false,
            columns: colm.columns,
            dom: '<"html5buttons"B>lTfgitp',
            language: {
                emptyTable: "No se encontraron registros",
                zeroRecords: "",
              
            },
            lengthChange: false,
            ordering: false,
            info: false,
            scrollX: true,
            responsive: true,
            buttons: [
                {
                    extend: 'copy',
                    className: "hiddenButton",
                    exportOptions:
                    {
                        columns: maxcolumn,
                        format: {
                            body: function (data, row, column, node) {
                                return data;
                            }
                        }
                    }
                },
                {
                    extend: 'excel',
                    className: "hiddenButton",
                    title: 'Document',
                    exportOptions:
                    {
                        columns: maxcolumn,
                        format: {
                            body: function (data, row, column, node) {
                                return data;
                            }
                        }
                    }
                },
                {
                    extend: 'pdf',
                    className: "hiddenButton",
                    title: 'Document',
                    exportOptions:
                    {
                        columns: maxcolumn,
                        format: {
                            body: function (data, row, column, node) {
                                return data;
                            }
                        }
                    }
                }
            ]
        });
    };

    $.fn.SetDataTableResponseNoButtons = function (colm, response) {
        var name = "#" + this.get(0).id;
        if (this.DataTable.isDataTable(name)) {
            this.DataTable().clear();
            this.DataTable().destroy();
        }
        var maxcolumn = $.map(colm.columns, function (value, index) {
            if (value.title !== "Action") {
                return [index];
            }
        });
        this.DataTable({
            bSort: false,
            bFilter: false,
            columns: colm.columns,
            dom: '<"html5buttons"B>lTfgitp',
            language: {
                emptyTable: "No se encontraron registros",
                zeroRecords: "",
                
            },
            lengthChange: false,
            ordering: false,
            info: false,
            scrollX: true,
            responsive: true,
            buttons: [
                {
                    extend: 'copy',
                    className: "hiddenButton",
                    exportOptions:
                    {
                        columns: maxcolumn,
                        format: {
                            body: function (data, row, column, node) {
                                return data;
                            }
                        }
                    }
                },
                {
                    extend: 'excel',
                    className: "hiddenButton",
                    title: 'Document',
                    exportOptions:
                    {
                        columns: maxcolumn,
                        format: {
                            body: function (data, row, column, node) {
                                return data;
                            }
                        }
                    }
                },
                {
                    extend: 'pdf',
                    className: "hiddenButton",
                    title: 'Document',
                    exportOptions:
                    {
                        columns: maxcolumn,
                        format: {
                            body: function (data, row, column, node) {
                                return data;
                            }
                        }
                    }
                }
            ]
        }).rows.add(response).draw();
    };


    $.fn.SetDataTableResponseNoButtonsCustom = function (colm, response , page ) {
        var name = "#" + this.get(0).id;
        if (this.DataTable.isDataTable(name)) {
            this.DataTable().clear();
            this.DataTable().destroy();
        }
        var maxcolumn = $.map(colm.columns, function (value, index) {
            if (value.title !== "Action") {
                return [index];
            }
        });
        this.DataTable({
            bSort: false,
            bFilter: false,
            columns: colm.columns,
            "scrollY": "350px",
            "scrollCollapse": true,
            "paging": page,
            dom: '<"html5buttons"B>lTfgitp',
            language: {
                emptyTable: "No se encontraron registros",
                zeroRecords: "",

            },
            lengthChange: false,
            ordering: false,
            info: false,
            scrollX: true,
            responsive: true,
            buttons: [
                {
                    extend: 'copy',
                    className: "hiddenButton",
                    exportOptions:
                    {
                        columns: maxcolumn,
                        format: {
                            body: function (data, row, column, node) {
                                return data;
                            }
                        }
                    }
                },
                {
                    extend: 'excel',
                    className: "hiddenButton",
                    title: 'Document',
                    exportOptions:
                    {
                        columns: maxcolumn,
                        format: {
                            body: function (data, row, column, node) {
                                return data;
                            }
                        }
                    }
                },
                {
                    extend: 'pdf',
                    className: "hiddenButton",
                    title: 'Document',
                    exportOptions:
                    {
                        columns: maxcolumn,
                        format: {
                            body: function (data, row, column, node) {
                                return data;
                            }
                        }
                    }
                }
            ]
        }).rows.add(response).draw();
    };

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *>Boostrap 3< * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
    //$.SwalSuccess = function (message) {
    //    swal({
    //        title: tituto,
    //        text: message,
    //        type: 'success',
    //        ButtonColor: "1AC943",
    //    });
    //};
    //
    //$.SwalInfo = function (message) {
    //    swal({
    //        title: tituto,
    //        text: message,
    //        type: 'info',
    //        ButtonColor: "1AC943",
    //    });
    //};
    //
    //$.SwalError = function (message) {
    //    swal({
    //        title: tituto,
    //        text: message,
    //        type: 'error',
    //        ButtonColor: "1AC943",
    //    });
    //};
    //
    //$.SwalWarning = function (message) {
    //    swal({
    //        title: tituto,
    //        text: message,
    //        type: 'warning',
    //        ButtonColor: "1AC943",
    //    });
    //};
    //
    //$.SwalConfirm = function (message, fn) {
    //    swal({
    //        title: tituto,
    //        text: message,
    //        type: 'info',
    //        showCancelButton: true,
    //        confirmButtonColor: '#1AC943',
    //        cancelButtonColor: '#d33',
    //        confirmButtonText: 'Yes',
    //        cancelButtonText: "No"
    //    }, function () {
    //        fn();
    //    });
    //};
    //
    //$.SwalOptionConfirm = function (message, fn) {
    //    swal({
    //        title: tituto,
    //        text: message,
    //        type: 'info',
    //        showCancelButton: true,
    //        confirmButtonColor: '#1AC943',
    //        cancelButtonColor: '#d33',
    //        confirmButtonText: 'Yes',
    //        cancelButtonText: "No"
    //    }, function (isConfirm) {
    //        var resultado = isConfirm; fn(resultado);
    //    });
    //};

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *>Boostrap 3< * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *>Boostrap 4< * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    $.SwalSuccess = function (message) {
        Swal.fire({
            title: tituto,
            text: message,
            type: 'success',
            ButtonColor: "1AC943",
        });
    };

    $.SwalInfo = function (message) {
        Swal.fire({
            title: tituto,
            text: message,
            type: 'info',
            ButtonColor: "1AC943",
        });
    };

    $.SwalError = function (message) {
        Swal.fire({
            title: tituto,
            text: message,
            type: 'error',
            ButtonColor: "1AC943",
        });
    };

    $.SwalWarning = function (message) {
        Swal.fire({
            title: tituto,
            text: message,
            type: 'warning',
            ButtonColor: "1AC943",
        });
    };

    $.SwalConfirm = function (message, fn) {
        Swal.fire({
            title: tituto,
            text: message,
            type: 'info',
            showCancelButton: true,
            confirmButtonColor: '#1AC943',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
            cancelButtonText: "No"
        }).then((result) => {
            if (result.value) {
                fn();
            }
        })
    };

    $.SwalOptionConfirm = function (message, fn) {
        Swal.fire({
            title: tituto,
            text: message,
            type: 'info',
            showCancelButton: true,
            confirmButtonColor: '#1AC943',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
            cancelButtonText: "No"
        }).then((result) => {
            if (result.value)
                fn(true);
            else
                fn(false);
        })
    };

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *>Boostrap 4< * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
});



 $(document).ready(function () {
        try {
            
        } catch (e) {
            console.log(e);
        }
      
    });





