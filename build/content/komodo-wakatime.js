/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 * 
 * The contents of this file are subject to the Mozilla Public License
 * Version 1.1 (the "License"); you may not use this file except in
 * compliance with the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 * 
 * Software distributed under the License is distributed on an "AS IS"
 * basis, WITHOUT WARRANTY OF ANY KIND, either express or implied. See the
 * License for the specific language governing rights and limitations
 * under the License.
 * 
 * The Original Code is Komodo code.
 * 
 * The Initial Developer of the Original Code is ActiveState Software Inc.
 * Portions created by ActiveState Software Inc are Copyright (C) 2000-2008
 * ActiveState Software Inc. All Rights Reserved.
 * 
 * Contributor(s):
 *   ActiveState Software Inc
 *   Renato Raver
 * 
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 * 
 * ***** END LICENSE BLOCK ***** */

/**
 * An extension to list TODO items found in opened files / projects.
 * Features:
 *  - regex search markers
 *  - case sensitibity
 *  - search in current file or opened files
 *  - double-click to jump to file
 *  - next, previous buttons to jump between markers
 * Updates results on:
 *  - File open
 *  - File close
 *  - File save
 *  - View changed
 */

// Setup namespace
if (typeof(ko) == 'undefined') {
    var ko = {};
}
if (typeof(ko.extensions) == 'undefined') {
    ko.extensions = {};
}
ko.dialogs.prompt("[WakaTime] Enter your wakatime.com api key:");
// Make todo extension namespace and add our js code
ko.extensions.todo = {};
(function() {
   

    this.OnLoad = function() {
        // Ensure find results knows about us
        ko.dialogs.prompt("[WakaTime] Enter your wakatime.com api key:");
        alert("test!!!");
    }

    this.OnUnload = function() {
        alert("test!!!");
    }

}).apply(ko.extensions.todo);

// Initialize it once Komodo has finished loading
// XXX: TODO: Use an observer or notification mechanism.
addEventListener("load", function() { setTimeout(ko.extensions.todo.OnLoad, 3000); }, false);
addEventListener("unload", ko.extensions.todo.OnUnload, false);