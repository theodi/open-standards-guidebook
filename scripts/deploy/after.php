<?php
  echo shell_exec('php craft clear-caches/compiled-templates');
  echo shell_exec('php craft clear-caches/data');
  echo shell_exec('php craft clear-caches/temp-files');
  echo shell_exec('php craft clear-caches/template-caches');
  echo shell_exec('php craft clear-caches/upper-purge-all');
  echo shell_exec('php craft migrate/all');
?>
