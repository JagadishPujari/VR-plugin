/**
 * Plugin to create question
 * @class org.ekstep.plugins.question:createquestionController
 * Jagadish P<jagadish.pujari@tarento.com>
 */
'use strict';
angular.module('createquestionapp', [])
    .controller('QuestionFormController', ['$scope', 'instance', function($scope, instance) {
        var ctrl = this;
        ctrl.selectedMenuItem = 'data';
        ctrl.config = [{'menuName':'Multiple Choice','icon':'list icon','data':[{'header':'Header 1','content':'Content 1'},{'header':'Header 2','content':'Content 2'},{'header':'Header 2','content':'Content 2'},{'header':'Header 2','content':'Content 2'}]},
                     {'menuName':'Fill in the Blanks','icon':'minus square outline icon','data':[{'header':'Header 1','content':'Content 1'},{'header':'Header 2','content':'Content 2'},{'header':'Header 2','content':'Content 2'},{'header':'Header 2','content':'Content 2'}]},
                     {'menuName':'Classify, Match & Order','icon':'block layout icon','data':[{'header':'Header 1','content':'Content 1'},{'header':'Header 2','content':'Content 2'}]},
                     {'menuName':'Written & Spoken','icon':'write icon','data':[{'header':'Header 1','content':'Content 1'},{'header':'Header 2','content':'Content 2'}]},
                     {'menuName':'Highlight','icon':'crosshairs icon','data':[{'header':'Header 1','content':'Content 1'},{'header':'Header 2','content':'Content 2'}]},
                     {'menuName':'Math','icon':'superscript icon','data':[{'header':'Header 1','content':'Content 1'},{'header':'Header 2','content':'Content 2'}]},
                     {'menuName':'Graphing','icon':'line chart icon','data':[{'header':'Header 1','content':'Content 1'},{'header':'Header 2','content':'Content 2'}]},
                     {'menuName':'Charts','icon':'bar chart icon','data':[{'header':'Header 1','content':'Content 1'},{'header':'Header 2','content':'Content 2'}]},
                     {'menuName':'Chemistry','icon':'lab icon','data':[{'header':'Header 1','content':'Content 1'},{'header':'Header 2','content':'Content 2'}]},
                     {'menuName':'Other','icon':'ellipsis horizontal icon','data':[{'header':'Header 1','content':'Content 1'},{'header':'Header 2','content':'Content 2'}]}
                    ];


         ctrl.selectedMenuItemData = ctrl.config[0].data;           
        ctrl.cancel = function() {
            $scope.closeThisDialog();
        }

        ctrl.switchTab = function(id,res){
            ctrl.selectedMenuItemData = res.data;
            $("#first_" + id).addClass('activeItem').siblings().removeClass('activeItem');
            
        }
    }]);

//# sourceURL=createquestion.js 