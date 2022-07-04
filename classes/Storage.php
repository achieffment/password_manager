<?php

    class Storage
    {
        public $json;
        public $root;

        public function __construct()
        {
            $this->root = $_SERVER['DOCUMENT_ROOT'];
            $this->json = $this->dataRead();

            if (file_exists($this->root.'\data\data.json')) {
                if (!file_exists($this->root.'\data\backupInfo.txt')) {
                    $file = fopen($this->root.'\data\backupInfo.txt', 'w');
                    $infoString = "Last time changed: " . date("d/m/Y H:i:s") . "\n";
                    $infoString .= "Last number of backup changed, number [0]" . "\n";
                    fwrite($file, $infoString);
                    fclose($file);
                }
                $file = file_get_contents($this->root.'\data\backupInfo.txt');
                preg_match("/\[.*\]/", $file, $match);
                $replace = ['[', ']'];
                $myMatch = str_replace($replace, "", $match);
                $i = $myMatch[0] + 1;
                if ($i >= 100) {
                    $i = 1;
                }
                copy($this->root.'\data\data.json', $this->root.'\data\data_bak' . $i . '.json');

                $file = fopen($this->root.'\data\backupInfo.txt', 'w+');
                $infoString = "Last time changed: " . date("d/m/Y H:i:s") . "\n";
                $infoString .= "Last number of backup changed, number [" . $i . "]\n";
                fwrite($file, $infoString);
                fclose($file);
            }
        }

        public function createFile(){
            $file = fopen($this->root.'\data\data.json', 'w');
            fwrite($file, "");
            fclose($file);
        }

        public function dataWrite($json)
        {
            $file = fopen($this->root.'\data\data.json', 'w+');
            fwrite($file, $json);
            fclose($file);
        }

        public function dataRead()
        {
            if (!file_exists($this->root."\data\data.json")) {
                $this->createFile();
                return "";
            } else {
                $json = file_get_contents($this->root."\data\data.json");
                return $json;
            }
        }

        public function dataReadAsArray()
        {
            if (!file_exists($this->root."\data\data.json")) {
                $this->createFile();
                return "";
            } else {
                $jsonAr = json_decode(file_get_contents($this->root."\data\data.json"), true);
                return $jsonAr;
            }
        }
    }

?>