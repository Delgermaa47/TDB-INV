<?php
    require ROOT."\inc\db.php";
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div>
        <ul>all user lists
            <?php
                $query = 'select * from users';
                $results = json_decode(_select($query, 'select_users'), true);
                foreach($results as $key=>$value) {
                    extract($value);
                    ?>
                    <li><?php echo $id; ?></li>
                    <li><?php echo $first_name; ?></li>
                <?php
                }
                ?>
        </ul>

    </div>
</body>
</html>
