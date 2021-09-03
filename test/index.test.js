const log = console.log;
const _ = require('lodash');
const chai = require('chai');
const should = chai.should();
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const mongoose = require('mongoose');
const blogController = require('../controllers/blogControllers')
const Blog  = require('../models/blog')

describe('database',()=>{
    before((done)=>{
        const dbURI = 'mongodb+srv://Nithish:welcome123@nodeblog.1kxq2.mongodb.net/note-tuts?retryWrites=true&w=majority';
        mongoose.connect(dbURI, { useNewUrlParser:true, useUnifiedTopology: true})
             .then((result)=>{ 
            // app.listen(3000);
            done()
         })
             .catch((err)=> console.log(err));
    })
    
    it('creating blog should work',(done)=>{
    let blog = {
        title:"spm",
        snippet:"hello",
        body:"management"
    }
    const blogs = new Blog(blog)
    blogs.save()
    Blog.find()
    .then((res)=>{
        res[0].should.have.property('title');
        done();
    })
    .catch(done)
    })
    it('should able to read',(done)=>{
        Blog.find()
        .then((res)=>{
            res.should.be.a('array');
            done();
        }).catch(done)
    })
    it('should delete blog',(done)=>{
        
       
        Blog.find()
        .then((res)=>{
            const id = mongoose.Types.ObjectId(res[0]._id);
            Blog.findByIdAndDelete(id);
            expect(res[0]).to.not.include(id);
            done();
        }).catch(done)
    })
    
})