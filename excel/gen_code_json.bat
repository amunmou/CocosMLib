set WORKSPACE=..

set GEN_CLIENT=%WORKSPACE%\luban\Luban.ClientServer\Luban.ClientServer.exe
set CONF_ROOT=.\Confs


%GEN_CLIENT% -j cfg --^
 -d %CONF_ROOT%\__root__.xml ^
 --input_data_dir .\Datas ^
 --output_code_dir %WORKSPACE%\assets\script\gen\table ^
 --output_data_dir  %WORKSPACE%\assets\resources\data ^
 --gen_types code_typescript_json,data_json ^
 --typescript:embed_bright_types ^
 --output:data:compact_json ^
 -s all

pause