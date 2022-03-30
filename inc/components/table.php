<?php
    class NewTable
    {
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
            $bla =  testBlockHTML(
                "<table class='inv-table table mt-4 pt-4'>
                <tr>
                  <th>Company</th>
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
    $employee->headers = ["id", "name"];
?>
