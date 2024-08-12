<?php
// fetch_schedule.php
include 'config.php';

$user_id = $_GET['userID']; // Assuming user ID is passed via GET request
$monday = new DateTime('monday this week');
$sunday = new DateTime('sunday this week');

// Fetch work schedules
$scheduleQuery = "SELECT ws.ScheduleID, ws.startTime, ws.endTime, ws.DayOfWeek 
                  FROM workSchedule ws
                  JOIN usersWorkSchedule uws ON ws.id = uws.ScheduleID
                  WHERE uws.userID = :userID 
                  AND ws.DayOfWeek BETWEEN :monday AND :sunday
                  ORDER BY ws.date, ws.startTime";
$stmt = $pdo->prepare($scheduleQuery);
$stmt->execute(['userID' => $user_id, 'monday' => $monday->format('Y-m-d'), 'sunday' => $sunday->format('Y-m-d')]);
$schedules = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Fetch goals
$goalsQuery = "SELECT * FROM goals 
               WHERE userID = :userID
               AND (start_date <= :sunday AND end_date >= :monday)";
$stmt = $pdo->prepare($goalsQuery);
$stmt->execute(['userID' => $user_id, 'monday' => $monday->format('Y-m-d'), 'sunday' => $sunday->format('Y-m-d')]);
$goals = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Fetch tasks
$tasksQuery = "SELECT * FROM tasks 
               WHERE userID = :userID 
               AND deadline BETWEEN :monday AND :sunday";
$stmt = $pdo->prepare($tasksQuery);
$stmt->execute(['userID' => $user_id, 'monday' => $monday->format('Y-m-d'), 'sunday' => $sunday->format('Y-m-d')]);
$tasks = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Combine all results into one array
$response = [
    'workSchedule' => $schedules,
    'goals' => $goals,
    'tasks' => $tasks
];

// Return the response as JSON
echo json_encode($response);
?>