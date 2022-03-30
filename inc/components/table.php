<?php
    class NewTable
    {
        public $cols;
        public $rows;
        public $headers;
        function __set($propName, $propValue)
        {
            $this->$propName = $propValue;
        }
        
        function __construct()
        {
            $this->put_table_header();
        }

        protected function put_table_header() {
            echo "called";
            $bla =  testBlockHTML(
                "<table>
                <tr>
                  <th style='color: red'>Company</th>
                  <th>Contact</th>
                  <th>Country</th>
                </tr>
                <tr>
                  <td>Alfreds Futterkiste</td>
                  <td>Maria Anders</td>
                  <td>Germany</td>
                </tr>
                <tr>
                  <td>Centro comercial Moctezuma</td>
                  <td>Francisco Chang</td>
                  <td>Mexico</td>
                </tr>
              </table>"
            );
            echo $bla;
        }
    }

    $employee = new NewTable();
    $employee->cols = 3;
    $employee->rows = 2;
    $employee->headers = ["id", "name"];
    echo $employee->cols;
    print_arr_values( $employee->headers);
?>
