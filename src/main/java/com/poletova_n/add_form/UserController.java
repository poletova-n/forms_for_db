package com.poletova_n.add_form;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class UserController {
    @Autowired
    UserService userService;

    @RequestMapping("/")
    public String mainPage(Model model){
        List<User> list=userService.getAll();

        model.addAttribute("todo", list);
        return "add";
    }

    @ResponseBody
    @RequestMapping(value = "/records", method = RequestMethod.POST,  headers = {"content-type=application/json"})
    public User addTask(@RequestBody User task, Model model){
        return userService.save(task);
    }

    @ResponseBody
    @RequestMapping(value = "/records", method = RequestMethod.PUT)
    public User updateTask(@RequestBody User task, Model model){
        return userService.save(task);
    }

    @ResponseBody
    @RequestMapping(value = "/records", method = RequestMethod.DELETE)
    public void deleteTask(@RequestBody User task){
        userService.delete(task);
    }
}
