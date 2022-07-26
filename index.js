$(document).ready(function() {
  jQuery.extend(jQuery.fn.dataTableExt.oSort, {
    "date-eu-pre": function(date) {
      date = date.replace(" ", "");

      if (!date) {
        return 0;
      }

      var year;
      var eu_date = date.split(/[\.\-\/]/);

      /*year (optional)*/
      if (eu_date[2]) {
        year = eu_date[2];
      } else {
        year = 0;
      }

      /*month*/
      var month = eu_date[0];
      if (month.length == 1) {
        month = 0 + month;
      }

      /*day*/
      var day = eu_date[1];

      if (day.length == 1) {
        day = 0 + day;
      }

      return (year + month + day) * 1;
    },

    "date-eu-asc": function(a, b) {
      return ((a < b) ? -1 : ((a > b) ? 1 : 0));
    },

    "date-eu-desc": function(a, b) {
      return ((a < b) ? 1 : ((a > b) ? -1 : 0));
    }
  });

  $('#sheet0').dataTable({
    dom: 'frtip',
    responsive: {
      breakpoints: [{
          name: 'desktop',
          width: 768
        },
        {
          name: 'screen-xs',
          width: 767
        }
      ]
    },
    order: [
      [1, 'asc']
    ],
    columnDefs: [{
        className: 'desktop',
        targets: [0, 1, 2, 3, 4, 5]
      },
      {
        className: 'screen-xs',
        targets: [0, 1, 2, 3, 4, 5, 6]
      },
      // , {
      //   id: 'month',
      //   targets: [3]
      // },
      // {
      //   searchable: false,
      //   targets: 7
      // },
      {
        type: 'date-eu',
        targets: [1]
      }
    ],
    createdRow: function(row, data, dataIndex) {
      if (data[5].includes('vacated')) {
        $(row).addClass('vacated');
      } else if (data[5].includes('affirmed')) {
        $(row).addClass('affirmed');
      }
    }
  });
})