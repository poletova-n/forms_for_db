package com.poletova_n.add_form;

import java.util.List;
import java.util.Spliterator;
import java.util.Spliterators;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository repo;
    public User save(User user){
        return repo.save(user);
    }
    public void delete(User user){
        repo.delete(user.getId());
    }

    public List<User> getAll(){
        return StreamSupport.stream(Spliterators.spliteratorUnknownSize(repo.findAll().iterator(),
                Spliterator.NONNULL),false).collect(Collectors.toList());
    }
}
