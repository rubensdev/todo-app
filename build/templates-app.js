angular.module('templates-app', ['firstrun/firstrun.tpl.html', 'home/home.tpl.html']);

angular.module("firstrun/firstrun.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("firstrun/firstrun.tpl.html",
    "<section id=\"firstrun\" ng-controller=\"FirstRunController\">\n" +
    "	<div id=\"card3\" class=\"card\" ng-class=\"{'hide' : nextCard < 0}\">\n" +
    "		<div class=\"hints\">\n" +
    "		 	<h1 translate=\"MODDELRESET_TITLE\"></h1>\n" +
    "		 	<p translate=\"MODDELRESET_MSG1\"></p>\n" +
    "			<p translate=\"MODDELRESET_MSG2\"></p>\n" +
    "			<p translate=\"MODDELRESET_ENJOY\"></p>\n" +
    "			<a translate=\"NEXT_GO\" href ng-click=\"next()\"></a>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "	<div id=\"card2\" class=\"card\" ng-class=\"{'hide' : nextCard < 1}\">\n" +
    "		<div class=\"hints\">\n" +
    "			<h1 translate=\"ADDINGTASK_TITLE\"></h1>\n" +
    "			<div id=\"img_example\" class=\"icon\"></div>\n" +
    "			<p translate=\"ADDINGTASK_MSG\"></p>\n" +
    "			<a translate=\"NEXT_BUTTON\" href ng-click=\"next()\"></a>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "	<div id=\"card1\" class=\"card\" ng-class=\"{'hide' : nextCard < 2}\">\n" +
    "		<img id=\"logo\" ng-class=\"{'show': showLogo }\" src=\"assets/img/applogo.png\" />\n" +
    "		<div id=\"appTitle\" ng-class=\"{'show': showText }\">\n" +
    "			<h1>FLAT TODO LIST</h1>\n" +
    "			<h2>By RubensDEV</h2>\n" +
    "			<p translate=\"WELCOME_APP\"></p>\n" +
    "			<a translate=\"NEXT_BUTTON\" href ng-click=\"next()\"></a>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "</section>\n" +
    "");
}]);

angular.module("home/home.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("home/home.tpl.html",
    "<section id=\"main\" ng-controller=\"HomeController\">\n" +
    "	<header id=\"header\">\n" +
    "		<div class=\"icon\" id=\"addTaskButton\" ng-click=\"showPanel()\"></div>\n" +
    "	</header>\n" +
    "	<div id=\"addTaskForm\" ng-class=\"{'active' : showTaskPanel}\">\n" +
    "		<textarea name=\"newTask\" placeholder=\"{{ 'TEXTAREA_PH' | translate}}\" ng-model=\"newTask\" maxlength=\"140\"></textarea>\n" +
    "		<p class=\"counter\" ng-class=\"{'red' : maxLength}\" ng-bind=\"countChars()\"></p>\n" +
    "		<h3 translate=\"TASKCOLOR_TITLE\"></h3>\n" +
    "		<div class=\"sliderContainer\">\n" +
    "			<rzslider\n" +
    "				rz-slider-floor=\"0\"\n" +
    "				rz-slider-ceil=\"colorMax\"\n" +
    "				rz-slider-model=\"color\"\n" +
    "				rz-slider-translate=\"colorTranslate\"></rzslider>\n" +
    "		</div>\n" +
    "		<div class=\"buttonsPanel\">\n" +
    "			<div id=\"cancelButton\" class=\"button medium\" ng-click=\"cancel()\" translate=\"CANCEL_BTN\"></div>\n" +
    "			<div id=\"submitButton\" class=\"button medium\" ng-click=\"editing? doneEditing() : addTask()\">\n" +
    "				{{ editing? ('EDIT_BTN' | translate) : ('SUBMIT_BTN' | translate) }}\n" +
    "			</div>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "	<ul id=\"filters\">\n" +
    "		<li><a href ng-click=\"changeStatus('')\" ng-class=\"{'selected' : status == ''}\" translate=\"ALLTASKS\"></a></li>\n" +
    "		<li><a href ng-click=\"changeStatus('active')\" ng-class=\"{'selected' : status == 'active'}\" translate=\"ACTIVETASKS\"></a></li>\n" +
    "		<li><a href ng-click=\"changeStatus('completed')\" ng-class=\"{'selected' : status == 'completed'}\" translate=\"COMPLETEDTASKS\"></a></li>\n" +
    "	</ul>\n" +
    "	<ul id=\"taskList\">\n" +
    "		<li ng-repeat=\"task in tasks | filter:statusFilter track by $index\">\n" +
    "			<div class=\"taskView\" style=\"border-left: 48px solid {{getTaskColor(task.color)}};\">\n" +
    "				<input class=\"taskCheck icon\" type=\"checkbox\" ng-model=\"task.completed\" />\n" +
    "				<div class=\"taskTitle\" ng-click=\"showMenu = !showMenu\">{{ task.title }}</div>	\n" +
    "			</div>\n" +
    "			<div class=\"menuTaskPanel\" ng-class=\"{'active' : showMenu && !editing}\">\n" +
    "				<div id=\"editTask\" class=\"menuIcon icon\" ng-click=\"editTask(task)\"></div>\n" +
    "				<div id=\"deleteTask\" class=\"menuIcon icon\" ng-click=\"removeTask(task)\"></div> \n" +
    "			</div>\n" +
    "		</li>\n" +
    "	</ul>\n" +
    "</section>\n" +
    "");
}]);
