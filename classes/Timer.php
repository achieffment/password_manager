<?php

        class Timer
        {
            public $startTime;
            public $endTime;
            public $timeDifference;

            function __construct()
            {
                $this->startTime = file_get_contents($_SERVER['DOCUMENT_ROOT'] . "\startTime.txt");
                $this->endTime = strtotime("+10 minutes", $this->startTime);
                $this->timeDifference = $this->endTime - time();
            }

            public function getStartTime()
            {
                return "Start time: " . date('H:i:s', $this->startTime);
            }

            public function getEndTime()
            {
                return "End time: " . date('H:i:s', $this->endTime);
            }

            public function getCurrentTime()
            {
                return "Now: " . date('H:i:s');
            }

            public function getTimeDifference()
            {
                return "Time left: " . date('i:s', $this->timeDifference);
            }
        }

?>